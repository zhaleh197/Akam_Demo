// Labels for the face-quality measurements (kyc/modules/face_capture/quality.py).
export const FACE_METRICS = {
  face_count: ['Faces found', 'تعداد چهره'],
  det_score: ['Detector confidence', 'اطمینان آشکارساز'],
  center_offset: ['Off-centre', 'فاصله از مرکز کادر'],
  face_height_ratio: ['Face height / frame', 'نسبت ارتفاع چهره به کادر'],
  context_scale: ['Context around face', 'فضای اطراف چهره'],
  sharpness: ['Sharpness', 'وضوح'],
  sharpness_ratio: ['Sharpness vs session', 'وضوح نسبت به جلسه'],
  brightness: ['Brightness (0-255)', 'روشنایی (۰ تا ۲۵۵)'],
  illumination_asymmetry: ['Uneven lighting', 'ناهمواری نور'],
  yaw: ['Yaw (°)', 'چرخش افقی سر (°)'],
  pitch: ['Pitch (°)', 'چرخش عمودی سر (°)'],
  roll: ['Roll (°)', 'کج بودن سر (°)'],
  eye_openness_left: ['Left eye openness', 'باز بودن چشم چپ'],
  eye_openness_right: ['Right eye openness', 'باز بودن چشم راست'],
  mouth_openness: ['Mouth openness', 'باز بودن دهان'],
  gaze_offset: ['Gaze (horizontal)', 'نگاه (افقی)'],
  gaze_vertical: ['Gaze (vertical)', 'نگاه (عمودی)'],
  clear_logit: ['Face uncovered (logit)', 'بدون پوشش (لاجیت)'],
  background_fraction: ['Background visible', 'سهم پس‌زمینه'],
  background_edge_density: ['Background edges', 'لبه‌های پس‌زمینه'],
  background_luma_std: ['Background luma spread', 'پراکندگی روشنایی پس‌زمینه'],
  still_similarity: ['Still vs video (cosine)', 'شباهت عکس و ویدیو'],
};

export const metricRows = (metrics, t) =>
  Object.entries(metrics || {}).map(([k, v]) => [
    FACE_METRICS[k] ? t(...FACE_METRICS[k]) : k,
    typeof v === 'number' ? +v.toFixed(4) : String(v),
    true,
  ]);
