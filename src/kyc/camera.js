import { useCallback, useEffect, useRef, useState } from 'react';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Front camera in a <video>. Shown mirrored (CSS), sent to the API as-is.
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  const start = useCallback(
    async (width = 1280) => {
      stop();
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('This browser cannot open the camera here (it needs HTTPS or localhost).');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: width } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();
      setActive(true);
    },
    [stop],
  );

  useEffect(() => stop, [stop]);
  return { videoRef, streamRef, start, stop, active };
}

export function grabFrame(video, maxWidth = 960, quality = 0.85) {
  const scale = Math.min(1, maxWidth / video.videoWidth);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

// Full-resolution still from the same camera; a video frame if the browser
// has no ImageCapture.
export async function takeStill(stream, video) {
  const track = stream?.getVideoTracks()[0];
  if (track && 'ImageCapture' in window) {
    try {
      return await new window.ImageCapture(track).takePhoto();
    } catch {
      /* fall back to a frame */
    }
  }
  return grabFrame(video, 4096, 0.95);
}

export const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

export const dataUrlToB64 = (url) => (url ? url.slice(url.indexOf(',') + 1) : null);
