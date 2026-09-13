import { LitElement, css, html } from 'lit';
import './hk37xx-remote-card-editor.js';

const CARD_TAG = 'hk37xx-remote-card';
const EDITOR_TAG = 'hk37xx-remote-card-editor';
const DOMAIN = 'hk37xx';

const BUTTON_KEYS = [
  'volume_up', 'volume_down', 'nav_up', 'nav_down', 'nav_exit',
  'tune_up', 'tune_down', 'tuner_direct', 'tuner_mem', 'dim_display',
  'menu', 'rds', 'speaker_a', 'speaker_b', 'harman_volume', 'auto_preset',
  'tone', 'assign_analog', 'assign_digital',
];

function entityKey(entity) {
  const uniqueId = entity?.unique_id || '';
  const entityId = entity?.entity_id || '';
  for (const key of ['tuner_frequency', 'volume_up', 'volume_down', ...BUTTON_KEYS, 'player', 'source']) {
    if (uniqueId.endsWith(`_${key}`) || entityId.endsWith(`_${key}`)) return key;
  }
  return undefined;
}

function deviceIsHK37xx(device) {
  return Array.from(device?.identifiers || []).some((identifier) => (
    Array.isArray(identifier) && identifier[0] === DOMAIN
  ));
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
    if (!this.hass) return;
    this.hass.callService(domain, service, data);
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

  render() {
    if (!this.hass || !this.config?.device) {
      return html`<ha-card header="Harman Kardon Remote"><div class="message">Select a receiver device in the card configuration.</div></ha-card>`;
    }

    const entities = this._entities;
    const player = this.hass.states[entities.player];
    const source = this.hass.states[entities.source];
    const frequency = this.hass.states[entities.tuner_frequency];
    const available = Boolean(player);
    const powered = player?.state === 'on';
    const currentSource = source?.state || source?.attributes?.current_option || 'FM';
    const options = this._sources();
    const device = this.hass.devices?.[this.config.device];
    const title = this.config.title || device?.name || 'Harman Kardon';

    return html`
      <ha-card>
        <div class="remote" aria-label="${title} remote control">
          <div class="remote-top">
            <div class="brand">HARMAN<span>/</span>KARDON</div>
            <button class="power" title="Turn receiver off" aria-label="Turn receiver off" @click=${() => this._media('turn_off')} ?disabled=${!powered}>⏻</button>
          </div>

          <div class="lcd" aria-live="polite">
            <div class="lcd-source">${currentSource}</div>
            <div class="lcd-value">${frequency?.state && frequency.state !== 'unknown' ? `${frequency.state} MHz` : powered ? 'ON' : 'STANDBY'}</div>
            <div class="lcd-status">${available ? (powered ? 'NETWORK READY' : 'STANDBY') : 'DEVICE UNAVAILABLE'}</div>
          </div>

          <div class="source-row">
            ${['FM', 'AM', 'CD', 'USB', 'BT', 'TV'].map((label) => html`
              <button class="key source-key ${currentSource === (label === 'BT' ? 'Bluetooth' : label) ? 'selected' : ''}" @click=${() => this._selectNamedSource(label)}>${label}</button>
            `)}
          </div>

          <div class="control-row">
            <button class="key wide" @click=${() => this._media('volume_down')}>VOL −</button>
            <button class="key wide" @click=${() => this._toggleMute()}>MUTE</button>
            <button class="key wide" @click=${() => this._media('volume_up')}>VOL +</button>
          </div>

          <div class="source-select-row">
            <label for="hk-source">SOURCE</label>
            <select id="hk-source" .value=${currentSource} @change=${(event) => this._selectSource(event)}>
              ${options.map((option) => html`<option value=${option}>${option}</option>`)}
            </select>
          </div>

          <div class="section-label">TUNER</div>
          <div class="tuner-display">
            <input type="number" min="87.5" max="108" step="0.1" .value=${frequency?.state !== 'unknown' ? frequency?.state || '' : ''} placeholder="87.5–108.0" @change=${(event) => this._setFrequency(event)} />
            <span>MHz</span>
          </div>
          <div class="tuner-row">
            <button class="key" @click=${() => this._press('tune_down')}>TUNE −</button>
            <button class="key accent" @click=${() => this._press('tuner_direct')}>DIRECT</button>
            <button class="key" @click=${() => this._press('tune_up')}>TUNE +</button>
          </div>
          <div class="tuner-row compact">
            <button class="key" @click=${() => this._press('tuner_mem')}>MEM</button>
            <button class="key" @click=${() => this._press('auto_preset')}>AUTO</button>
            <button class="key" @click=${() => this._press('rds')}>RDS</button>
          </div>

          <div class="section-label">NAVIGATION</div>
          <div class="navigation">
            <button class="key nav-up" @click=${() => this._press('nav_up')}>▲</button>
            <button class="key nav-left" @click=${() => this._press('nav_exit')}>◀</button>
            <button class="nav-ok" @click=${() => this._press('menu')}>MENU</button>
            <button class="key nav-right" @click=${() => this._press('menu')}>▶</button>
            <button class="key nav-down" @click=${() => this._press('nav_down')}>▼</button>
          </div>

          <div class="bottom-row">
            <button class="key" @click=${() => this._press('speaker_a')}>SPEAKER A</button>
            <button class="key" @click=${() => this._press('speaker_b')}>SPEAKER B</button>
            <button class="key" @click=${() => this._press('harman_volume')}>VOL EQ</button>
            <button class="key" @click=${() => this._press('tone')}>TONE</button>
            <button class="key" @click=${() => this._press('dim_display')}>DIM</button>
          </div>
        </div>
      </ha-card>
    `;
  }

  _selectNamedSource(label) {
    const names = { BT: 'Bluetooth' };
    const option = names[label] || label;
    const source = this._sources().find((candidate) => candidate.toLowerCase() === option.toLowerCase());
    if (source) this._call('select', 'select_option', { entity_id: this._entities.source, option: source });
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; background: transparent; box-shadow: none; }
    .remote { box-sizing: border-box; max-width: 360px; margin: 0 auto; padding: 18px 16px 22px; border: 1px solid #3f4248; border-radius: 32px; background: linear-gradient(155deg, #292c31 0%, #17191c 45%, #0c0d0f 100%); box-shadow: inset 0 1px 1px #62666d, inset 0 -3px 8px #050505, 0 8px 18px #0008; color: #d5d7da; }
    .remote-top { display: flex; align-items: center; justify-content: space-between; padding: 0 8px 14px; }
    .brand { color: #b9bdc1; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .18em; }
    .brand span { color: #81868d; padding: 0 2px; }
    button { font: inherit; }
    .power { width: 34px; height: 34px; border: 1px solid #5d636b; border-radius: 50%; background: #202328; color: #d95b55; font-size: 20px; line-height: 1; cursor: pointer; box-shadow: inset 0 1px 2px #000, 0 1px 2px #000; }
    .power:disabled { color: #696d72; opacity: .55; cursor: default; }
    .lcd { margin: 0 8px 15px; padding: 10px 13px 8px; border: 2px solid #050606; border-radius: 5px; background: linear-gradient(#34413a, #202a25); box-shadow: inset 0 0 10px #050806; color: #a9d6a0; font-family: 'Courier New', monospace; text-align: right; text-shadow: 0 0 4px #9bd79a; }
    .lcd-source { min-height: 16px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; }
    .lcd-value { min-height: 28px; font-size: 21px; font-weight: 700; letter-spacing: .08em; }
    .lcd-status { color: #759a76; font-size: 8px; letter-spacing: .13em; }
    .source-row, .control-row, .tuner-row, .bottom-row { display: grid; gap: 7px; }
    .source-row { grid-template-columns: repeat(6, 1fr); }
    .control-row { grid-template-columns: repeat(3, 1fr); margin: 12px 0; }
    .key { min-height: 34px; padding: 6px 4px; border: 1px solid #484d54; border-radius: 6px; background: linear-gradient(#3c4046, #24272b); color: #d2d4d6; box-shadow: inset 0 1px 1px #74787d55, 0 2px 2px #0008; cursor: pointer; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-shadow: 0 1px 1px #000; }
    .key:hover { background: linear-gradient(#50555c, #2e3237); }
    .key:active, .key.selected { border-color: #9caa8d; background: linear-gradient(#67725e, #414b3d); color: #f2f6e8; }
    .key:focus-visible, .power:focus-visible, .nav-ok:focus-visible { outline: 2px solid #a8c7ff; outline-offset: 2px; }
    .source-key { min-height: 29px; font-size: 9px; }
    .wide { min-height: 39px; }
    .source-select-row { display: grid; grid-template-columns: 55px 1fr; align-items: center; gap: 9px; margin: 4px 0 14px; color: #858b92; font-size: 9px; font-weight: 700; letter-spacing: .1em; }
    select, input { box-sizing: border-box; width: 100%; border: 1px solid #4e545b; border-radius: 5px; background: #17191b; color: #d7dbd5; padding: 7px 8px; font: 12px 'Courier New', monospace; }
    .section-label { margin: 11px 3px 6px; color: #747a81; font-size: 9px; font-weight: 700; letter-spacing: .2em; }
    .tuner-display { display: grid; grid-template-columns: 1fr 34px; align-items: center; gap: 7px; margin-bottom: 7px; }
    .tuner-display span { color: #8d949a; font: 10px 'Courier New', monospace; }
    .tuner-row { grid-template-columns: repeat(3, 1fr); }
    .tuner-row.compact { margin-top: 7px; }
    .accent { border-color: #a49b68; color: #e7d98a; }
    .navigation { display: grid; grid-template: repeat(3, 38px) / repeat(3, 1fr); gap: 5px; max-width: 170px; margin: 0 auto 12px; }
    .navigation .key { border-radius: 50%; min-height: 0; padding: 0; }
    .nav-up { grid-area: 1 / 2; }
    .nav-left { grid-area: 2 / 1; }
    .nav-ok { grid-area: 2 / 2; border: 1px solid #646970; border-radius: 50%; background: #131518; color: #d2d5d8; font-size: 9px; cursor: pointer; box-shadow: inset 0 1px 2px #000, 0 2px 2px #0008; }
    .nav-right { grid-area: 2 / 3; }
    .nav-down { grid-area: 3 / 2; }
    .bottom-row { grid-template-columns: repeat(5, 1fr); }
    .bottom-row .key { min-height: 31px; font-size: 8px; }
    .message { padding: 18px; color: var(--secondary-text-color); }
  `;
}

customElements.define(CARD_TAG, HK37xxRemoteCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Harman Kardon HK 3700/3770 Remote',
  description: 'A remote-shaped control for a Harman Kardon HK 3700/3770 receiver.',
  preview: false,
  documentationUrl: 'https://github.com/wongy123/harman-kardon-stereo-receiver-remote-card',
});
