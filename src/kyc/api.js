// Client for the KYC service (E:\1405\kyc, FastAPI).
//
// Locally the site talks to `/kyc-api`, which Vite proxies to the KYC server
// (vite.config.js), so no CORS setup is needed. For a deployed KYC server set
// VITE_KYC_API_URL to its origin and add the site's origin to the server's
// KYC_CORS_ORIGINS. The base URL can also be changed at runtime in the
// connection panel of the KYC Lab.

export const DEFAULT_BASE_URL = import.meta.env.VITE_KYC_API_URL || '/kyc-api';

export class ApiError extends Error {
  constructor({ status, body, method, path }) {
    const info = describeError(status, body);
    super(info.en || `HTTP ${status}`);
    this.status = status;
    this.body = body;
    this.method = method;
    this.path = path;
    this.code = info.code;
    this.message_en = info.en;
    this.message_fa = info.fa;
    this.details = info.details;
  }
}

// The service answers errors in three shapes: KycError {error, message, details},
// HTTPException {detail: {...}} and FastAPI validation {detail: [{loc, msg}]}.
function describeError(status, body) {
  if (status === 0) return { code: 'network_error', en: 'The KYC service could not be reached' };
  if (body == null) return { code: null, en: `HTTP ${status}` };
  if (typeof body === 'string') return { code: null, en: body.slice(0, 300) };
  const d = body.detail ?? body;
  if (Array.isArray(d)) {
    return { code: 'validation_error', en: d.map((x) => `${(x.loc || []).join('.')}: ${x.msg}`).join('; ') };
  }
  if (typeof d === 'string') return { code: null, en: d };
  return { code: d.error || null, en: d.message || '', fa: d.message_fa || '', details: d.details || null };
}

const join = (base, path) => `${base.replace(/\/+$/, '')}${path}`;

const formOf = (entries) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) {
    if (v === undefined || v === null || v === '') continue;
    if (v instanceof Blob) fd.append(k, v, v.name || `${k}.jpg`);
    else fd.append(k, String(v));
  }
  return fd;
};

export function createClient({ baseUrl = DEFAULT_BASE_URL, accessCode = '', onLog } = {}) {
  let seq = 0;

  async function request(method, path, { json, form, signal } = {}) {
    const headers = {};
    if (accessCode) headers['X-Access-Code'] = accessCode;
    let body;
    if (json !== undefined) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(json);
    } else if (form) {
      body = form;
    }
    const id = ++seq;
    const t0 = performance.now();
    let res;
    try {
      res = await fetch(join(baseUrl, path), { method, headers, body, signal });
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      onLog?.({ id, method, path, status: 0, ms: performance.now() - t0 });
      throw new ApiError({ status: 0, body: null, method, path });
    }
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
    onLog?.({ id, method, path, status: res.status, ms: performance.now() - t0 });
    if (!res.ok) throw new ApiError({ status: res.status, body: data, method, path });
    return data;
  }

  const get = (path, opts) => request('GET', path, opts);
  const post = (path, opts) => request('POST', path, opts);

  return {
    baseUrl,
    // ops
    health: () => get('/health'),
    whoami: () => get('/v1/access/whoami'),

    // 01 document OCR
    ocrProfiles: () => get('/v1/ocr/profiles'),
    ocrDocument: (file, { profile, returnPortrait = true, returnCard = true } = {}) =>
      post('/v1/ocr/document', {
        form: formOf({ file, profile, return_portrait: returnPortrait, return_card: returnCard }),
      }),

    // 02 face quality / capture
    faceQualityCheck: (file) => post('/v1/face-quality/check', { form: formOf({ file }) }),
    captureStart: () => post('/v1/face-capture/sessions', { json: {} }),
    captureFrame: (sid, blob) => post(`/v1/face-capture/sessions/${sid}/frames`, { form: formOf({ file: blob }) }),
    captureStill: (sid, blob) => post(`/v1/face-capture/sessions/${sid}/still`, { form: formOf({ file: blob }) }),
    captureResult: (sid, includeSelfie = true) =>
      get(`/v1/face-capture/sessions/${sid}/result?include_selfie=${includeSelfie}`),

    // 03 face match: card portrait (file or base64) vs a capture_id
    faceMatchFile: (reference, captureId) =>
      post('/v1/face-match/verify', { form: formOf({ reference, capture_id: captureId }) }),
    faceMatchBase64: (referenceBase64, captureId) =>
      post('/v1/face-match/verify/base64', { json: { reference_base64: referenceBase64, capture_id: captureId } }),

    // 04 passive anti-spoof
    antispoof: (captureId) => post('/v1/antispoof/verify', { json: { capture_id: captureId } }),

    // 05 active liveness
    livenessStart: (captureId) => post('/v1/liveness/sessions', { json: { capture_id: captureId } }),
    livenessFrame: (sid, blob) => post(`/v1/liveness/sessions/${sid}/frames`, { form: formOf({ file: blob }) }),
    livenessResult: (sid) => get(`/v1/liveness/sessions/${sid}/result`),

    // 06a document forensics
    forensics: (file, profile) => post('/v1/forensics/document', { form: formOf({ file, profile }) }),

    // orchestrator: one verification case
    caseCreate: () => post('/v1/cases'),
    caseDocument: (caseId, file, profile) =>
      post(`/v1/cases/${caseId}/document`, { form: formOf({ file, profile }) }),
    caseCapture: (caseId) => post(`/v1/cases/${caseId}/capture`, { json: {} }),
    caseLiveness: (caseId) => post(`/v1/cases/${caseId}/liveness`),
    caseFaceMatch: (caseId) => post(`/v1/cases/${caseId}/face-match`),
    caseFinalize: (caseId) => post(`/v1/cases/${caseId}/finalize`),
    caseView: (caseId) => get(`/v1/cases/${caseId}`),
  };
}

// Human text for the error codes a demo user is likely to hit.
export const ERROR_TEXT = {
  network_error: [
    'The KYC service is not reachable. Start it with `uvicorn kyc.api.app:app --port 8000` in the kyc project.',
    'سرویس KYC در دسترس نیست. آن را در پروژهٔ kyc با دستور uvicorn kyc.api.app:app --port 8000 اجرا کنید.',
  ],
  model_not_available: ['A model file this module needs is missing on the server.', 'فایل مدل لازم برای این ماژول روی سرور نیست.'],
  backend_not_installed: ['A library this module needs is not installed on the server.', 'کتابخانهٔ لازم برای این ماژول روی سرور نصب نیست.'],
  image_quality: ['The image is not usable - take a clearer photo.', 'تصویر قابل استفاده نیست؛ عکس واضح‌تری بگیرید.'],
  invalid_input: ['The request could not be read.', 'درخواست قابل خواندن نبود.'],
  access_denied: ['A valid access code is required (set it in the connection panel).', 'کد دسترسی معتبر لازم است (در پنل اتصال وارد کنید).'],
  capture_not_found: ['The selfie has expired - take a new one.', 'سلفی منقضی شده است؛ سلفی جدید بگیرید.'],
  session_not_found: ['The session has expired - start again.', 'جلسه منقضی شده است؛ دوباره شروع کنید.'],
  session_closed: ['The session is already closed.', 'جلسه بسته شده است.'],
  case_incomplete: ['Some steps of this case are not done yet.', 'برخی مراحل این پرونده هنوز انجام نشده است.'],
  payload_too_large: ['The file is too large.', 'حجم فایل بیش از حد مجاز است.'],
  profile_not_found: ['Unknown document type.', 'نوع مدرک ناشناخته است.'],
};

export const b64ToDataUrl = (b64, mime = 'image/jpeg') => (b64 ? `data:${mime};base64,${b64}` : null);
