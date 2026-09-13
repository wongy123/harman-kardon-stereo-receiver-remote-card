import { LitElement, css, html } from 'lit';

const EDITOR_TAG = 'hk37xx-remote-card-editor';
const DOMAIN = 'hk37xx';

function deviceIsHK37xx(device) {
  const identifiers = device?.identifiers || [];
  return Array.from(identifiers).some((identifier) => (
    Array.isArray(identifier) && identifier[0] === DOMAIN
  ));
}

class HK37xxRemoteCardEditor extends LitElement {
  static properties = {
    hass: {},
    _config: {},
  };

  constructor() {
    super();
    this._config = {};
  }

  setConfig(config) {
    this._config = { ...config };
  }

  _configChanged(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  _deviceChanged(event) {
    this._configChanged({
      ...this._config,
      device: event.detail.value,
    });
  }

  _titleChanged(event) {
    const title = event.target.value;
    const config = { ...this._config };
    if (title) config.title = title;
    else delete config.title;
    this._configChanged(config);
  }

  _fallbackDevices() {
    return Object.values(this.hass?.devices || {})
      .filter(deviceIsHK37xx)
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  render() {
    if (!this.hass) return html``;
    const devices = this._fallbackDevices();
    return html`
      <div class="editor">
        <div class="field">
          <label>Receiver device</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ device: { integration: DOMAIN } }}
            .value=${this._config.device || ''}
            @value-changed=${this._deviceChanged}
          ></ha-selector>
          ${devices.length === 0 ? html`
            <p class="help">No HK 3700/3770 device is registered. Add the Harman Kardon integration first.</p>
          ` : html``}
        </div>
        <div class="field">
          <label for="title">Card title (optional)</label>
          <input
            id="title"
            type="text"
            .value=${this._config.title || ''}
            placeholder="Harman Kardon"
            @change=${this._titleChanged}
          />
        </div>
        <p class="help">The card controls every entity belonging to the selected receiver device. It does not require an entity ID.</p>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .editor { display: grid; gap: 20px; padding: 8px 0; }
    .field { display: grid; gap: 8px; }
    label { color: var(--primary-text-color); font-weight: 500; }
    input { box-sizing: border-box; width: 100%; padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
    .help { margin: 0; color: var(--secondary-text-color); font-size: 0.9em; line-height: 1.45; }
  `;
}

customElements.define(EDITOR_TAG, HK37xxRemoteCardEditor);
