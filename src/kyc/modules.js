import { Camera, FileSearch, FileText, Fingerprint, Layers, ScanFace, ShieldCheck, UserCheck } from 'lucide-react';

// The catalogue the KYC Lab is built from: one entry per module of the KYC
// service, with the endpoints its demo calls.
export const MODULES = [
  {
    id: 'ocr',
    step: '01',
    icon: FileText,
    image: '/imgs/ocr.png',
    accent: 'from-orange-400 to-amber-500',
    title: ['Document OCR', 'خواندن کارت ملی (OCR)'],
    tagline: ['Read the Iranian national card', 'خواندن اطلاعات کارت ملی'],
    description: [
      'Locates every field on the card with a YOLO detector, reads Persian text and digits, validates the national-code check digit and Jalali dates, and crops the portrait for face matching.',
      'همهٔ فیلدهای کارت را با آشکارساز YOLO پیدا می‌کند، متن و ارقام فارسی را می‌خواند، رقم کنترل کد ملی و تاریخ‌های شمسی را اعتبارسنجی می‌کند و عکس روی کارت را برای تطبیق چهره جدا می‌کند.',
    ],
    endpoints: [
      ['GET', '/v1/ocr/profiles'],
      ['POST', '/v1/ocr/document'],
    ],
  },
  {
    id: 'face-quality',
    step: '02a',
    icon: ScanFace,
    image: '/imgs/face-detect.png',
    accent: 'from-cyan-400 to-blue-500',
    title: ['Face Quality', 'کیفیت چهره'],
    tagline: ['Judge one face photo', 'ارزیابی یک عکس چهره'],
    description: [
      'Face detection, 106-point landmarks and an occlusion model on a single photo: framing, sharpness, lighting, head pose, eyes, mouth, gaze, cover and background - each as a reason you can read.',
      'تشخیص چهره، ۱۰۶ نقطهٔ کلیدی و مدل پوشش روی یک عکس: کادر، وضوح، نور، زاویهٔ سر، چشم، دهان، نگاه، پوشش و پس‌زمینه؛ هرکدام با دلیل قابل‌خواندن.',
    ],
    endpoints: [['POST', '/v1/face-quality/check']],
  },
  {
    id: 'face-capture',
    step: '02b',
    icon: Camera,
    image: '/imgs/Face-recognition.svg',
    accent: 'from-sky-400 to-indigo-500',
    title: ['Guided Selfie Capture', 'گرفتن سلفی هدایت‌شده'],
    tagline: ['Live camera session → capture_id', 'جلسهٔ زندهٔ دوربین ← capture_id'],
    description: [
      'Streams camera frames, gives one debounced hint at a time, and once the stream qualifies takes a full-resolution still that must show the same person. The result is a server-held selfie.',
      'فریم‌های دوربین را می‌فرستد، هر بار یک راهنمای پایدار نشان می‌دهد و وقتی تصویر مناسب شد، یک عکس با وضوح کامل می‌گیرد که باید همان شخص باشد. نتیجه سلفی‌ای است که روی سرور نگه داشته می‌شود.',
    ],
    endpoints: [
      ['POST', '/v1/face-capture/sessions'],
      ['POST', '/v1/face-capture/sessions/{id}/frames'],
      ['POST', '/v1/face-capture/sessions/{id}/still'],
      ['GET', '/v1/face-capture/sessions/{id}/result'],
    ],
  },
  {
    id: 'face-match',
    step: '03',
    icon: UserCheck,
    image: '/imgs/face_match.png',
    accent: 'from-violet-400 to-purple-600',
    title: ['Face Match', 'تطبیق چهره'],
    tagline: ['Card portrait vs selfie', 'عکس کارت در برابر سلفی'],
    description: [
      'ArcFace embeddings of the card portrait and the captured selfie, compared by cosine similarity against accept / reject lines calibrated for card-vs-selfie pairs.',
      'بردار ویژگی ArcFace عکس کارت و سلفی با شباهت کسینوسی مقایسه می‌شود؛ با آستانه‌های قبول و رد که برای جفت کارت-سلفی تنظیم شده‌اند.',
    ],
    endpoints: [
      ['POST', '/v1/face-match/verify'],
      ['POST', '/v1/face-match/verify/base64'],
    ],
  },
  {
    id: 'antispoof',
    step: '04',
    icon: ShieldCheck,
    image: '/imgs/antispoof.png',
    accent: 'from-rose-400 to-red-600',
    title: ['Anti-Spoofing', 'تشخیص جعل (ضدجعل)'],
    tagline: ['Printed photo or screen replay?', 'عکس چاپی یا پخش از صفحه؟'],
    description: [
      'Passive presentation-attack detection on the captured selfie with MiniFASNet over a box-jitter grid. Too blurry to judge means "retake", never a spoof verdict.',
      'تشخیص غیرفعال حملهٔ ارائه روی سلفی با MiniFASNet و چند برش جابه‌جاشده. اگر عکس برای قضاوت خیلی تار باشد، نتیجه «عکس دوباره» است، نه جعل.',
    ],
    endpoints: [['POST', '/v1/antispoof/verify']],
  },
  {
    id: 'liveness',
    step: '05',
    icon: Fingerprint,
    image: '/imgs/Liveness_process.png',
    accent: 'from-emerald-400 to-green-600',
    title: ['Active Liveness', 'تشخیص زنده بودن'],
    tagline: ['Random movement challenges', 'چالش‌های حرکتی تصادفی'],
    description: [
      'A random sequence of tasks - blink, turn left or right, smile, move closer - checked frame by frame, while the identity is kept tied to the captured selfie.',
      'دنباله‌ای تصادفی از حرکت‌ها (پلک، چرخش به چپ یا راست، لبخند، نزدیک شدن) فریم‌به‌فریم بررسی می‌شود و هویت در تمام مدت با سلفی گرفته‌شده مقایسه می‌شود.',
    ],
    endpoints: [
      ['POST', '/v1/liveness/sessions'],
      ['POST', '/v1/liveness/sessions/{id}/frames'],
      ['GET', '/v1/liveness/sessions/{id}/result'],
    ],
  },
  {
    id: 'forensics',
    step: '06',
    icon: FileSearch,
    image: null,
    accent: 'from-fuchsia-400 to-pink-600',
    title: ['Document Forensics', 'جرم‌شناسی سند'],
    tagline: ['Was the card photo edited?', 'آیا عکس کارت ویرایش شده؟'],
    description: [
      'Error-level and noise analysis of the portrait and key fields against calibrated limits, plus editing-software metadata. Advisory: a signal sends a case to review, never rejects it.',
      'تحلیل سطح خطا و نویز ناحیهٔ عکس و فیلدهای کلیدی نسبت به حدهای کالیبره‌شده و بررسی نرم‌افزار ویرایش در فراداده. مشورتی است: یک نشانه پرونده را به بررسی دستی می‌فرستد، رد نمی‌کند.',
    ],
    endpoints: [['POST', '/v1/forensics/document']],
  },
  {
    id: 'case',
    step: '∑',
    icon: Layers,
    image: '/imgs/kyc.png',
    accent: 'from-cyan-400 via-blue-500 to-purple-600',
    title: ['Full Verification Case', 'احراز هویت کامل (پرونده)'],
    tagline: ['Every module → one verdict', 'همهٔ ماژول‌ها ← یک نتیجه'],
    description: [
      'The orchestrator: card, selfie, face match, liveness and anti-spoof in one case, combined by policy into approved, manual review or rejected - with the blocking reasons.',
      'هماهنگ‌کننده: کارت، سلفی، تطبیق چهره، زنده بودن و ضدجعل در یک پرونده که طبق سیاست به «تأیید»، «بررسی دستی» یا «رد» می‌رسد؛ همراه با دلایل.',
    ],
    endpoints: [
      ['POST', '/v1/cases'],
      ['POST', '/v1/cases/{id}/document'],
      ['POST', '/v1/cases/{id}/capture'],
      ['POST', '/v1/cases/{id}/face-match'],
      ['POST', '/v1/cases/{id}/liveness'],
      ['POST', '/v1/cases/{id}/finalize'],
    ],
  },
];

export const moduleById = (id) => MODULES.find((m) => m.id === id);
