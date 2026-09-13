class HK37xxRemoteCard extends HTMLElement {
  static getStubConfig() { return {}; }
  getCardSize() { return 4; }

  setConfig(config) {
    this.config = config || {};
  }

  constructor() {
    super();
  }

  set hass(hass) {
    this._hass = hass;
    const userEntity = this.config?.entity;
    this._entry = userEntity ? null : (hass.config_entries?.find(e => e.domain === 'hk37xx') || null);
    const entityId = userEntity || (this._entry ? `media_player.${(this._entry.title || 'hk_3770').toLowerCase().replace(/\s+/g, '_')}` : null);
    if (!entityId) {
      this.innerHTML = `<ha-card header="${this.config?.title || 'HK 37xx'}" style="font-family:sans-serif;background:#1a1a2e;color:#eee;padding:16px;"><div style="color:#999">No <code>entity</code> configured and no <code>hk37xx</code> integration found.</div></ha-card>`;
      return;
    }
    const prefix = userEntity ? entityId.replace('media_player.', '') : ((this._entry ? this._entry.title.toLowerCase().replace(/\s+/g, '_') : 'hk_3770'));
    this._entities = {
      media: `media_player.${prefix}`,
      volume_up: `button.${prefix}_volume_up`,
      volume_down: `button.${prefix}_volume_down`,
      mute: `media_player.${prefix}`,
      source: `select.${prefix}_source`,
      nav_up: `button.${prefix}_nav_up`,
      nav_down: `button.${prefix}_nav_down`,
      nav_exit: `button.${prefix}_nav_exit`,
      tune_up: `button.${prefix}_tune_up`,
      tune_down: `button.${prefix}_tune_down`,
      direct: `button.${prefix}_tuner_direct_entry`,
      mem: `button.${prefix}_tuner_store_preset`,
      rds: `button.${prefix}_rds`,
      speaker_a: `button.${prefix}_speaker_a`,
      speaker_b: `button.${prefix}_speaker_b`,
      tuner_freq: `number.${prefix}_tuner_frequency`,
      harman_vol: `button.${prefix}_harman_volume`,
      auto_preset: `button.${prefix}_tuner_store_preset`,
      tone: `button.${prefix}_tone_control`,
      dim: `button.${prefix}_dim_display`,
      menu: `button.${prefix}_menu`,
    };
    this.render();
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener('action', (e) => {
      const detail = e.detail || {};
      this.handleAction(detail.action, detail.value);
    });
  }

  handleAction(action, value) {
    if (!this._hass || !this._entities) return;
    const ent = this._entities;
    const press = (e) => this._hass.callService('button', 'press', { entity_id: e });
    switch (action) {
      case 'volume_up': return press(ent.volume_up);
      case 'volume_down': return press(ent.volume_down);
      case 'mute_toggle': {
        const mediaState = this._hass.states[ent.media];
        const isMuted = mediaState?.attributes?.is_volume_muted ?? false;
        return this._hass.callService('media_player', 'volume_mute', { entity_id: ent.media, is_volume_muted: !isMuted });
      }
      case 'power_off': return this._hass.callService('media_player', 'turn_off', { entity_id: ent.media });
      case 'select_source': return this._hass.callService('media_player', 'select_source', { entity_id: ent.media, source: value });
      case 'tune_direct': {
        if (value != null) this._hass.callService('number', 'set_value', { entity_id: ent.tuner_freq, value: value });
        return press(ent.direct);
      }
      case 'tuner_mem': return press(ent.mem);
      case 'auto_preset': return press(ent.auto_preset);
      case 'clear_entry': return; // no-op
      case 'rds': return press(ent.rds);
      case 'speaker_a': return press(ent.speaker_a);
      case 'speaker_b': return press(ent.speaker_b);
      case 'top_menu': return press(ent.menu);
      case 'tune_up': return press(ent.tune_up);
      case 'tune_down': return press(ent.tune_down);
      case 'nav_up': return press(ent.nav_up);
      case 'nav_down': return press(ent.nav_down);
      case 'nav_exit': return press(ent.nav_exit);
      case 'harman_volume': return press(ent.harman_vol);
      case 'tone_control': return press(ent.tone);
      case 'dim_display': return press(ent.dim);
      default: return;
    }
  }

  render() {
    if (!this._entities || !this._hass) return;
    const ent = this._entities;
    const states = {};
    const attrs = {};
    for (const [k, e] of Object.entries(ent)) {
      states[k] = this._hass.states[e]?.state || 'unknown';
      attrs[k] = this._hass.states[e]?.attributes || {};
    }
    const isOn = states.media === 'on' || this._hass.states[ent.media]?.state === 'on';
    const src = attrs.source?.current_source || attrs.source?.source || 'Unknown';
    const title = this.config?.title || (this._entry ? this._entry.title : 'Harman Kardon HK 37xx');

    this.innerHTML = `
      <ha-card header="${title}" style="font-family:sans-serif;background:#1a1a2e;color:#eee;">
        <style>
          .hk37xx-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:12px; }
          .hk37xx-row { grid-column:span 2; }
          .hk37xx-btn { border:none; border-radius:8px; padding:14px; font-size:14px; background:#2a2a40; color:#ccc; cursor:pointer; transition:background .15s; text-align:center; }
          .hk37xx-btn:hover { background:#3a3a60; }
          .hk37xx-btn.active { background:#4caf50; color:#fff; }
          .hk37xx-btn.disabled { opacity:.35; pointer-events:none; }
          input[type="number"] { width:100%; padding:8px; border-radius:8px; border:none; background:#2a2a40; color:#eee; font-size:16px; box-sizing:border-box; }
          select { width:100%; padding:8px; border-radius:8px; border:none; background:#2a2a40; color:#eee; }
        </style>
        <div style="display:flex;justify-content:space-between;padding:0 4px 8px;font-size:12px;opacity:.7;">
          <span>IR Tunnel · DLNA Readback</span>
          <span>${isOn ? '● ON' : '○ STANDBY'}</span>
        </div>
        <div class="hk37xx-grid">
          <div class="hk37xx-row">
            <select onchange="this.dispatchEvent(new CustomEvent('action', {bubbles:true, composed:true, detail:{action:'select_source', value:this.value}}))" aria-label="Source">
              ${['FM','AM','Analog','Digital','USB','CD','Phono','Bluetooth','vTuner','Home Network','Cable Sat','STB','TV']
                .map(s => `<option value="${s}" ${s===src ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="hk37xx-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="hk37xx-btn" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'volume_up'}}))">VOL +</button>
            <button class="hk37xx-btn" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'volume_down'}}))">VOL −</button>
            <button class="hk37xx-btn" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'mute_toggle'}}))">MUTE</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'power_off'}}))">PWR OFF</button>
          </div>
          <div class="hk37xx-row">
            <input type="number" step="0.1" min="87.5" max="108" value="${this._hass.states[ent.tuner_freq]?.state || 101.5}" aria-label="Tuner frequency (MHz)" placeholder="FM frequency (MHz)"
              onkeydown="if(event.key==='Enter'){this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tune_direct',value:this.valueAsNumber}}));this.blur();}">
          </div>
          <div class="hk37xx-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tune_direct'}}))">DIRECT</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tuner_mem'}}))">MEM</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'auto_preset'}}))">AUTO</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'clear_entry'}}))">CLEAR</button>
          </div>
          <div class="hk37xx-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'rds'}}))">RDS</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'speaker_a'}}))">A</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'speaker_b'}}))">B</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'top_menu'}}))">MENU</button>
          </div>
          <div class="hk37xx-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tune_up'}}))">▲</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tune_down'}}))">▼</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'nav_up'}}))">▲ MEN</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'nav_down'}}))">▼ MEN</button>
          </div>
          <div class="hk37xx-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'nav_exit'}}))">EXIT</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'harman_volume'}}))">VOL EQ</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'tone_control'}}))">TONE</button>
            <button class="hk37xx-btn ${!isOn ? 'disabled' : ''}" onclick="this.dispatchEvent(new CustomEvent('action',{bubbles:true,composed:true,detail:{action:'dim_display'}}))">DIM</button>
          </div>
        </div>
      </ha-card>`;
  }
}
customElements.define('hk37xx-remote-card', HK37xxRemoteCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'hk37xx-remote-card',
  name: 'Harman Kardon Remote',
  description: 'Touch-friendly remote control for the Harman Kardon HK 3700 / 3770 receiver.',
  preview: false,
  documentationUrl: 'https://github.com/wongy123/harman-kardon-stereo-receiver-remote-card',
});
