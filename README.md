# Harman Kardon HK 3700/3770 Remote Card (Lovelace plugin)

A standalone Lovelace card that turns any Home Assistant dashboard into a remote control for the Harman Kardon HK 3700 / 3770 stereo receiver. Uses the `hk37xx` integration entities directly — no backend, no extra dependencies.

Requires the `hk37xx` integration (`wongy123/harman-kardon-stereo-receiver`).

## HACS install

Add as custom repository (plugin category): `wongy123/harman-kardon-stereo-receiver-remote-card`

## Manual install

Copy `card/harman-remote.js` to `/config/www/`, register as Lovelace resource (`/local/harman-remote.js`), then use:
```yaml
type: custom:harman-remote-card
title: "HK 3770 Remote"
```

## Features
- Source dropdown (FM/AM/Analog/Digital/USB/CD/Phono/Bluetooth/vTuner/Home Network/Cable Sat/STB/TV)
- Volume (+/−), Mute, Power Off
- FM direct frequency entry (`DIRECT` + numeric value; `101.5` → digits `1015`; fixed-decimal-point display)
- Preset (MEM), Auto preset (AUTO), RDS, Speaker A/B, Menu navigation (MENU, ▲/▼, EXIT), Harman Volume (VOL EQ), Tone (TONE), Display dim (DIM)
- Status indicator (● ON / ○ STANDBY)
- Buttons disable when receiver is off (standby = tunnel down)

MIT
