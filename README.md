# Akam site

Company site with the **KYC Lab**: a live demo of every module of the KYC
service (`E:\1405\kyc`), each on its own page, calling the real API and showing
its decision, score, reasons and raw response. English / فارسی (RTL).

| Route | Page | KYC endpoints |
|---|---|---|
| `#/` | Landing | — |
| `#/kyc` | KYC Lab: connection status, all modules, API call log | `/health`, `/v1/access/whoami` |
| `#/kyc/ocr` | Document OCR | `/v1/ocr/profiles`, `/v1/ocr/document` |
| `#/kyc/face-quality` | Face quality of one photo | `/v1/face-quality/check` |
| `#/kyc/face-capture` | Guided selfie (camera) → `capture_id` | `/v1/face-capture/sessions/...` |
| `#/kyc/face-match` | Card portrait vs selfie | `/v1/face-match/verify[/base64]` |
| `#/kyc/antispoof` | Passive anti-spoofing | `/v1/antispoof/verify` |
| `#/kyc/liveness` | Active liveness (camera) | `/v1/liveness/sessions/...` |
| `#/kyc/forensics` | Document forensics | `/v1/forensics/document` |
| `#/kyc/case` | Full verification case → verdict | `/v1/cases/...` |

A selfie captured once (and a portrait read by OCR) is shared between pages
for about 10 minutes, the time the server keeps it, so face match, anti-spoof
and liveness can reuse it.

## Run locally

```bash
# 1. the KYC service
cd E:\1405\kyc
.venv\Scripts\python -m uvicorn kyc.api.app:app --port 8000

# 2. this site
npm install
npm run dev
```

Open <http://localhost:5173/#/kyc>. The site calls `/kyc-api/...`, which the
Vite dev server forwards to `http://127.0.0.1:8000`, so the KYC service needs no
CORS setting. Set `KYC_API_TARGET` (see `.env.example`) to forward elsewhere.

Start the KYC service with `KYC_DEBUG=true` to also see per-frame measurements
on the selfie page. The camera works on `localhost` or over HTTPS only - for a
phone on the LAN, use HTTPS.

## Pointing at a deployed KYC server

Either set `VITE_KYC_API_URL=https://kyc.example.com` at build time, or change
the base URL in the connection panel of the KYC Lab (stored in the browser).
The server must then allow this site's origin: `KYC_CORS_ORIGINS=["https://<site>"]`.
If the server runs with `KYC_REQUIRE_ACCESS=true`, enter the access code in
the same panel; it is sent as `X-Access-Code`.

## Layout

```
src/
  App.jsx              hash routes
  lib/                 router, language (en/fa), cx
  components/SiteNav   top navigation
  pages/               Home, KycLab, ModulePage (header + demo + API log)
  kyc/
    api.js             client for every KYC endpoint, error normalisation
    KycProvider.jsx    connection, health polling, call log, shared selfie/portrait
    SelfieCapture.jsx  face-capture session loop (frames -> still -> capture_id)
    LivenessRunner.jsx liveness session loop
    ui.jsx             decision badges, threshold gauges, reasons, JSON view, image tools
    modules.js         module catalogue (titles, descriptions, endpoints)
    demos/             one page per module
```

`src/NeuralEdgeAI.jsx`, `NeuralEdgeAIpre.jsx` and `testjs.jsx` are the previous
version of the site; they are no longer imported.
