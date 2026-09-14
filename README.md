# Harman Kardon HK 3700/3770 Remote Card

A Lovelace dashboard card styled as a physical Harman Kardon HK 3700/3770 remote. It controls the receiver through entities supplied by the [`hk37xx` integration](https://github.com/wongy123/harman-kardon-stereo-receiver).

## Install with HACS

1. Install `wongy123/harman-kardon-stereo-receiver` as an **Integration**.
2. Add `wongy123/harman-kardon-stereo-receiver-remote-card` as a HACS custom repository with category **Dashboard**.
3. Install the card. HACS adds the dashboard resource automatically.
4. Hard-refresh Home Assistant after the first install.

## Configure the card

Use the visual editor. The **Receiver device** selector lists HK 3700/3770 devices registered by the integration. The card is device-scoped; it does not require manually selecting an entity.

The equivalent YAML is:

```yaml
type: custom:hk37xx-remote-card
device: <Home Assistant device ID>
title: Living room receiver # optional
```

The device owns the media player, source selector, tuner frequency number, and IR button entities. The card discovers those entities from Home Assistant's entity registry, so entity IDs may be renamed without breaking the configuration.

## Controls

The card is intentionally touch-first rather than a visual replica of the plastic remote:

- One source selector containing every source exposed by the integration
- Analog and Digital assignment controls only when the selected device exposes them
- Large volume, mute, and power controls
- FM frequency entry, tune up/down, direct, memory, auto-preset, and RDS
- Menu, up, down, and exit controls; unsupported left/right/OK commands are not shown
- Speaker A/B, Harman Volume, Tone Control, display dimming, and supported playback controls

## Manual resource installation

Copy `dist/harman-kardon-stereo-receiver-remote-card.js` to `/config/www/` and add this resource:

```yaml
resources:
  - url: /local/harman-kardon-stereo-receiver-remote-card.js
    type: module
```

## License

MIT
