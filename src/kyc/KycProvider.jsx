import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient, DEFAULT_BASE_URL } from './api';
import { CAPTURE_LIFETIME_MS, KycContext } from './KycContext';

const load = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* storage blocked */
  }
};

export function KycProvider({ children }) {
  const [baseUrl, setBaseUrl] = useState(() => load('kyc_base_url', DEFAULT_BASE_URL));
  const [accessCode, setAccessCode] = useState(() => load('kyc_access_code', ''));
  const [health, setHealth] = useState({ state: 'checking' });
  const [log, setLog] = useState([]);
  // Shared between demos: a selfie captured once can feed face match,
  // anti-spoof and liveness; a portrait read by OCR can feed face match.
  const [capture, setCapture] = useState(null); // {captureId, selfieB64, result, at}
  const [portrait, setPortrait] = useState(null); // {b64, source, at}

  const onLog = useCallback((entry) => {
    setLog((l) => [{ ...entry, at: Date.now() }, ...l].slice(0, 60));
  }, []);

  const client = useMemo(() => createClient({ baseUrl, accessCode, onLog }), [baseUrl, accessCode, onLog]);

  const checkHealth = useCallback(async () => {
    try {
      const h = await client.health();
      let customer = null;
      let accessError = null;
      try {
        customer = (await client.whoami()).customer;
      } catch (err) {
        accessError = err;
      }
      setHealth({ state: accessError ? 'locked' : 'ok', modules: h.modules || [], customer, accessError });
    } catch (err) {
      setHealth({ state: 'down', error: err });
    }
  }, [client]);

  // Forget the selfie once the server has dropped it.
  useEffect(() => {
    if (!capture) return undefined;
    const id = setTimeout(() => setCapture(null), Math.max(0, CAPTURE_LIFETIME_MS - (Date.now() - capture.at)));
    return () => clearTimeout(id);
  }, [capture]);

  // Re-checked on every connection change and every 20 s.
  useEffect(() => {
    const first = setTimeout(checkHealth, 0);
    const id = setInterval(checkHealth, 20000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [checkHealth]);

  const value = useMemo(
    () => ({
      client,
      baseUrl,
      accessCode,
      setConnection: (url, code) => {
        const u = (url || '').trim() || DEFAULT_BASE_URL;
        setHealth({ state: 'checking' });
        setBaseUrl(u);
        setAccessCode((code || '').trim());
        save('kyc_base_url', u === DEFAULT_BASE_URL ? '' : u);
        save('kyc_access_code', (code || '').trim());
      },
      health,
      checkHealth,
      log,
      clearLog: () => setLog([]),
      capture,
      setCapture: (c) => setCapture(c ? { ...c, at: Date.now() } : null),
      portrait,
      setPortrait: (p) => setPortrait(p ? { ...p, at: Date.now() } : null),
    }),
    [client, baseUrl, accessCode, health, checkHealth, log, capture, portrait],
  );

  return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
}
