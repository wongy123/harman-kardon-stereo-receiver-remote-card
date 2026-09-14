import { LitElement, css, html } from 'lit';
import './hk37xx-remote-card-editor.js';

const CARD_TAG = 'hk37xx-remote-card';
const EDITOR_TAG = 'hk37xx-remote-card-editor';
const DOMAIN = 'hk37xx';
const BUTTON_KEYS = [
  'volume_up', 'volume_down', 'assign_analog', 'assign_digital',
  'nav_up', 'nav_down', 'nav_exit', 'tune_up', 'tune_down',
  'tuner_direct', 'tuner_mem', 'dim_display', 'menu', 'rds',
  'speaker_a', 'speaker_b', 'harman_volume', 'auto_preset', 'tone',
];

function deviceIsHK37xx(device) {
  return Array.from(device?.identifiers || []).some((identifier) => (
    Array.isArray(identifier) && identifier[0] === DOMAIN
  ));
}

function entityKey(entity) {
  const uniqueId = entity?.unique_id || '';
  const entityId = entity?.entity_id || '';
  const translationKey = entity?.translation_key || '';
  for (const key of ['tuner_frequency', ...BUTTON_KEYS, 'player', 'source']) {
    if (
      translationKey === key
      || uniqueId.endsWith(`_${key}`)
      || entityId.endsWith(`_${key}`)
    ) return key;
  }
  return undefined;
}

function entitiesForDevice(hass, deviceId) {
  const result = {};
  for (const [entityId, registryEntity] of Object.entries(hass.entities || {})) {
    if (registryEntity.device_id !== deviceId) continue;
    const key = entityKey({ ...registryEntity, entity_id: entityId });
    if (key && !result[key]) result[key] = entityId;
  }
  return result;
}

class HK37xxRemoteCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  static getStubConfig(hass) {
    const device = Object.values(hass?.devices || {}).find(deviceIsHK37xx);
    return device ? { type: `custom:${CARD_TAG}`, device: device.id } : {};
  }

  static getConfigElement() {
    return document.createElement(EDITOR_TAG);
  }

  setConfig(config) {
    this.config = { ...config };
  }

  get _entities() {
    return this.hass && this.config?.device
      ? entitiesForDevice(this.hass, this.config.device)
      : {};
  }

  _call(domain, service, data) {
    if (this.hass) this.hass.callService(domain, service, data);
  }

  _press(key) {
    const entityId = this._entities[key];
    if (entityId) this._call('button', 'press', { entity_id: entityId });
  }

  _media(service, data = {}) {
    const entityId = this._entities.player;
    if (entityId) this._call('media_player', service, { entity_id: entityId, ...data });
  }

  _selectSource(event) {
    const entityId = this._entities.source;
    if (entityId) this._call('select', 'select_option', { entity_id: entityId, option: event.target.value });
  }

  _setFrequency(event) {
    const value = Number(event.target.value);
    const entityId = this._entities.tuner_frequency;
    if (entityId && Number.isFinite(value)) this._call('number', 'set_value', { entity_id: entityId, value });
  }

  _toggleMute() {
    const state = this.hass?.states?.[this._entities.player];
    this._media('volume_mute', { is_volume_muted: !(state?.attributes?.is_volume_muted ?? false) });
  }

  _sources() {
    const source = this.hass?.states?.[this._entities.source];
    return source?.attributes?.options || ['FM', 'AM', 'Analog', 'Digital', 'USB', 'CD', 'Phono', 'Bluetooth', 'vTuner', 'Home Network', 'Cable Sat', 'STB', 'TV'];
  }

  _button(key, label, title = label, fallbackIcon) {
    const entityId = this._entities[key];
    if (!entityId) return html``;
    const icon = this.hass?.states?.[entityId]?.attributes?.icon || fallbackIcon;
    return html`<button class="control icon-button" title=${title} @click=${() => this._press(key)}>
      ${icon ? html`<ha-icon icon=${icon}></ha-icon>` : html``}<span>${label}</span>
    </button>`;
  }

  render() {
    if (!this.hass || !this.config?.device) {
      return html`<ha-card header="Harman Kardon Remote"><div class="message">Select a receiver device in the card configuration.</div></ha-card>`;
    }

    const entities = this._entities;
    const player = this.hass.states[entities.player];
    const source = this.hass.states[entities.source];
    const frequency = this.hass.states[entities.tuner_frequency];
    const device = this.hass.devices?.[this.config.device];
    const title = this.config.title || device?.name || 'Harman Kardon';
    const options = this._sources();
    const currentSource = source?.state || options[0] || '';
    const receiverAvailable = Boolean(player) && !['off', 'unavailable', 'unknown'].includes(player.state);
    const powered = receiverAvailable;

    return html`
      <ha-card>
        <div class="card">
          <header>
            <div>
              <h2>${title}</h2>
              <p class="status">${receiverAvailable ? 'On' : player ? 'Standby / unavailable' : 'Device entity unavailable'}</p>
            </div>
            <button class="power" ?disabled=${!powered} title="Turn receiver off" @click=${() => this._media('turn_off')}>⏻</button>
          </header>

          <section>
            <h3>Source</h3>
            <select .value=${currentSource} @change=${this._selectSource} aria-label="Receiver source">
              ${options.map((option) => html`<option value=${option}>${option}</option>`)}
            </select>
            ${(entities.assign_analog || entities.assign_digital) ? html`
              <div class="grid two">
                ${this._button('assign_analog', 'Analog', 'Cycle the analog RCA input assignment', 'mdi:audio-input-rca')}
                ${this._button('assign_digital', 'Digital', 'Cycle the digital coaxial or TOSLINK input assignment', 'mdi:toslink')}
              </div>
            ` : html``}
          </section>

          <section>
            <h3>Volume</h3>
            <div class="grid three">
              ${this._button('volume_down', 'Volume down', 'IR volume down', 'mdi:volume-minus')}
              <button class="control large icon-button" aria-label=${player?.attributes?.is_volume_muted ? 'Unmute' : 'Mute'} @click=${() => this._toggleMute()}>
                <ha-icon icon=${player?.attributes?.is_volume_muted ? 'mdi:volume-off' : 'mdi:volume-mute'}></ha-icon><span>${player?.attributes?.is_volume_muted ? 'Unmute' : 'Mute'}</span>
              </button>
              ${this._button('volume_up', 'Volume up', 'IR volume up', 'mdi:volume-plus')}
            </div>
          </section>

          ${(entities.tune_down || entities.tune_up) ? html`
            <section>
              <h3>Channel / Tuner</h3>
              <div class="grid two">
                ${this._button('tune_down', 'Channel / tuner −', 'Tune down', 'mdi:access-point-minus')}
                ${this._button('tune_up', 'Channel / tuner +', 'Tune up', 'mdi:access-point-plus')}
              </div>
            </section>
          ` : html``}

          <section>
            <h3>Tuner</h3>
            <div class="frequency">
              <input type="number" min="87.5" max="108" step="0.1" .value=${frequency?.state !== 'unknown' ? frequency?.state || '' : ''} placeholder="87.5–108.0" aria-label="FM frequency in MHz" @change=${this._setFrequency} />
              <span>MHz</span>
            </div>
            <div class="grid three">
              ${this._button('tuner_direct', 'Direct', 'Tune to a frequency', 'mdi:tune')}
              ${this._button('tuner_mem', 'Memory', 'Tuner memory', 'mdi:content-save')}
              ${this._button('rds', 'RDS', 'Radio data system', 'mdi:radio-tower')}
            </div>
            <div class="grid two compact">
              ${this._button('auto_preset', 'Auto preset', 'Scan and save presets', 'mdi:auto-fix')}
              ${this._button('dim_display', 'Dim display', 'Dim receiver display', 'mdi:brightness-6')}
            </div>
          </section>

          <section>
            <h3>Menu</h3>
            <div class="grid four">
              ${this._button('nav_up', 'Up', 'Menu up', 'mdi:menu-up')}
              ${this._button('menu', 'Menu', 'Open menu', 'mdi:menu')}
              ${this._button('nav_down', 'Down', 'Menu down', 'mdi:menu-down')}
              ${this._button('nav_exit', 'Exit', 'Exit menu', 'mdi:arrow-left')}
            </div>
          </section>

          <section>
            <h3>Receiver</h3>
            <div class="grid four">
              ${this._button('speaker_a', 'Speaker A', 'Toggle speaker A', 'mdi:speaker')}
              ${this._button('speaker_b', 'Speaker B', 'Toggle speaker B', 'mdi:speaker-multiple')}
              ${this._button('harman_volume', 'Harman Volume', 'Toggle Harman volume mode', 'mdi:volume-equal')}
              ${this._button('tone', 'Tone Control', 'Open tone controls', 'mdi:equalizer')}
            </div>
          </section>

          ${entities.player ? html`
            <section>
              <h3>Playback</h3>
              <div class="grid four">
                <button class="control icon-button" aria-label="Previous track" title="Previous track" @click=${() => this._media('previous_track')}><ha-icon icon="mdi:skip-previous"></ha-icon><span>Previous</span></button>
                <button class="control icon-button" aria-label="Stop" title="Stop" @click=${() => this._media('stop')}><ha-icon icon="mdi:stop"></ha-icon><span>Stop</span></button>
                <button class="control icon-button" aria-label=${player.state === 'playing' ? 'Pause' : 'Play'} title=${player.state === 'playing' ? 'Pause' : 'Play'} @click=${() => this._media(player.state === 'playing' ? 'pause' : 'play')}><ha-icon icon=${player.state === 'playing' ? 'mdi:pause' : 'mdi:play'}></ha-icon><span>${player.state === 'playing' ? 'Pause' : 'Play'}</span></button>
                <button class="control icon-button" aria-label="Next track" title="Next track" @click=${() => this._media('next_track')}><ha-icon icon="mdi:skip-next"></ha-icon><span>Next</span></button>
              </div>
            </section>
          ` : html``}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }
    .card { display: grid; gap: 18px; padding: 18px; color: var(--primary-text-color, #f5f5f5); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .icon-button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
    .icon-button ha-icon { --mdc-icon-size: 24px; }
    .icon-button span { line-height: 1.15; text-align: center; }
    h3 { margin-bottom: 9px; color: var(--secondary-text-color, #aeb4bd); font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .status { margin-top: 4px; color: var(--secondary-text-color, #aeb4bd); font-size: .85rem; }
    .power { width: 52px; height: 52px; border: 0; border-radius: 50%; background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff); font-size: 24px; cursor: pointer; }
    .power:disabled { background: var(--disabled-color, #777); opacity: .45; cursor: not-allowed; }
    .grid { display: grid; gap: 10px; }
    .grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 10px; }
    .grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .grid.five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    .compact { margin-top: 10px; }
    .control, select, input { box-sizing: border-box; min-height: 52px; width: 100%; border: 1px solid var(--divider-color, #59616b); border-radius: 12px; background: var(--secondary-background-color, #30343a); color: var(--primary-text-color, #f5f5f5); font: inherit; }
    .control:hover { border-color: var(--primary-color, #03a9f4); }
    .control:active { transform: translateY(1px); }
    .large { min-height: 60px; }
    select, input { padding: 0 13px; }
    .frequency { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 9px; margin-bottom: 10px; }
    .frequency span { color: var(--secondary-text-color); font-size: .9rem; }
    .message { padding: 18px; color: var(--secondary-text-color); }
    @media (max-width: 420px) {
      .card { padding: 14px; }
      .grid.four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid.five { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  `;
}

customElements.define(CARD_TAG, HK37xxRemoteCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Harman Kardon HK 3700/3770 Remote',
  description: 'A simple, touch-friendly receiver control card configured by device.',
  preview: false,
  documentationUrl: 'https://github.com/wongy123/harman-kardon-stereo-receiver-remote-card',
});
