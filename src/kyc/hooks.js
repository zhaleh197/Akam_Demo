import { useMemo } from 'react';

// Object URL for a picked file. Not revoked: a demo session holds a handful,
// and revoking in an effect cleanup breaks the image under StrictMode.
export const useObjectUrl = (blob) => useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob]);
