import { createContext, useContext } from 'react';

export const KycContext = createContext(null);

// The server keeps a captured selfie for 5x the session TTL (10 min by default).
export const CAPTURE_LIFETIME_MS = 10 * 60 * 1000;

export const useKyc = () => useContext(KycContext);
