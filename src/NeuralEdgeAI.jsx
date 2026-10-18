
import React, { useState } from 'react';
import { Upload, X, CheckCircle, XCircle, Sparkles, ArrowRight, ArrowLeft, Brain, FileImage, Languages } from 'lucide-react';

const COPY = {
  en: {
    languageButton: 'فارسی',
    backHome: 'Back to Home',
    navServices: 'Services',
    navBlog: 'Blog',
    navAbout: 'About us',
    navContact: 'Contact',
    heroLine1: 'Transform Your Business',
    heroLine2: 'With AI Intelligence',
    heroText: 'We deliver cutting-edge artificial intelligence solutions that drive innovation, enhance efficiency, and unlock unprecedented growth for your organization.',
    heroCta: 'Start Your AI Journey',
    heroDemo: 'View Demo',
    servicesTitle: 'Our AI Solutions',
    servicesText: 'Comprehensive artificial intelligence services tailored to your business needs',
    medicalTitle: 'Medical Projects',
    medicalText: 'Advanced AI solutions for healthcare and medical imaging. From diagnosis assistance to patient data analysis, we provide cutting-edge technology for the medical field.',
    kycText: 'Know Your Customer solutions with AI-powered identity verification, face detection, and document authentication to ensure secure and compliant onboarding.',
    learnMore: 'Learn more',
    aboutTitle: 'Leading the AI Revolution',
    aboutText: 'We are a team of AI researchers, data scientists, and engineers passionate about building intelligent systems that solve real-world problems.',
    aboutPoints: ['Cutting-edge research and development', 'Industry-leading AI expertise', 'Proven track record of success', 'End-to-end AI implementation'],
    contactTitle: "Let's Build the Future Together",
    contactText: 'Ready to transform your business with AI? Get in touch with our team of experts.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'Tell us about your project...',
    sendMessage: 'Send Message',
    demoBadge: 'Interactive Demo',
    demoTitlePrefix: 'Try Our',
    demoTitleHighlight: 'AI Services',
    demoText: 'Choose a service, upload your image, and see instant AI results.',
    photo: 'Photo',
    uploadHint: 'PNG, JPG up to 10MB',
    runAnalysis: 'Run Analysis',
    analyzing: 'Analyzing...',
    results: 'Results',
    emptyResults: 'Upload an image and click Run Analysis to see results here.',
    processing: 'Processing your image...',
    reset: 'Try Another Image',
    kycBadge: 'Complete KYC Solution',
    kycTitle: 'KYC Verification',
    kycSubtitle: 'AI Modules',
    kycIntro: 'Comprehensive identity verification powered by cutting-edge artificial intelligence. Secure, fast, and compliant with global standards.',
  },
  fa: {
    languageButton: 'English',
    backHome: 'بازگشت به خانه',
    navServices: 'خدمات',
    navBlog: 'بلاگ',
    navAbout: 'درباره ما',
    navContact: 'تماس',
    heroLine1: 'کسب‌وکار خود را متحول کنید',
    heroLine2: 'با هوش مصنوعی',
    heroText: 'ما راهکارهای پیشرفته هوش مصنوعی ارائه می‌دهیم تا نوآوری، بهره‌وری و رشد پایدار برای سازمان شما ایجاد شود.',
    heroCta: 'شروع مسیر هوش مصنوعی',
    heroDemo: 'مشاهده دمو',
    servicesTitle: 'راهکارهای هوش مصنوعی ما',
    servicesText: 'خدمات جامع هوش مصنوعی متناسب با نیازهای کسب‌وکار شما',
    medicalTitle: 'پروژه‌های پزشکی',
    medicalText: 'راهکارهای پیشرفته هوش مصنوعی برای سلامت و تصویربرداری پزشکی؛ از کمک به تشخیص تا تحلیل داده‌های بیمار.',
    kycText: 'راهکارهای احراز هویت مشتری با تشخیص چهره، تطبیق چهره و اعتبارسنجی مدارک برای ورود امن و سازگار.',
    learnMore: 'بیشتر بدانید',
    aboutTitle: 'پیشرو در تحول هوش مصنوعی',
    aboutText: 'ما تیمی از پژوهشگران، دانشمندان داده و مهندسان هوش مصنوعی هستیم که برای حل مسائل واقعی سیستم‌های هوشمند می‌سازیم.',
    aboutPoints: ['پژوهش و توسعه پیشرفته', 'تخصص حرفه‌ای در هوش مصنوعی', 'سابقه موفق در پروژه‌ها', 'پیاده‌سازی کامل از ابتدا تا اجرا'],
    contactTitle: 'آینده را با هم بسازیم',
    contactText: 'برای تحول کسب‌وکار خود با هوش مصنوعی، با تیم متخصص ما در ارتباط باشید.',
    name: 'نام',
    email: 'ایمیل',
    message: 'پیام',
    namePlaceholder: 'نام شما',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'درباره پروژه خود بنویسید...',
    sendMessage: 'ارسال پیام',
    demoBadge: 'دموی تعاملی',
    demoTitlePrefix: 'سرویس‌های',
    demoTitleHighlight: 'هوش مصنوعی',
    demoText: 'یک سرویس انتخاب کنید، تصویر خود را آپلود کنید و نتیجه را بلافاصله ببینید.',
    photo: 'تصویر',
    uploadHint: 'PNG یا JPG تا ۱۰ مگابایت',
    runAnalysis: 'اجرای تحلیل',
    analyzing: 'در حال تحلیل...',
    results: 'نتایج',
    emptyResults: 'یک تصویر آپلود کنید و روی اجرای تحلیل بزنید تا نتیجه اینجا نمایش داده شود.',
    processing: 'در حال پردازش تصویر...',
    reset: 'آزمایش تصویر دیگر',
    kycBadge: 'راهکار کامل KYC',
    kycTitle: 'احراز هویت KYC',
    kycSubtitle: 'ماژول‌های هوش مصنوعی',
    kycIntro: 'احراز هویت جامع با هوش مصنوعی پیشرفته؛ امن، سریع و سازگار با استانداردهای جهانی.',
  },
};

const getCopy = (language) => COPY[language] || COPY.en;

const LanguageToggle = ({ language, onToggle }) => {
  const copy = getCopy(language);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-4 top-4 z-[70] inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-slate-950/90 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-950/30 backdrop-blur-md transition-colors hover:border-cyan-300 hover:bg-slate-900"
      aria-label="Change language"
    >
      <Languages className="h-4 w-4 text-cyan-300" />
      <span>{copy.languageButton}</span>
    </button>
  );
};

const KYCModulesPage = ({ onBack, language }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const copy = getCopy(language);

  const modules = [
    {
      id: 'face-detection',
      title: 'Face Detection',
      icon: '/imgs/face-detect.png',
      color: 'from-cyan-400 to-blue-500',
      description: 'Advanced AI-powered face detection technology that identifies and locates human faces in images with high accuracy.',
      features: [
        'Real-time face detection',
        'Multi-face detection support',
        'High accuracy rate (99.5%+)',
        'Works in various lighting conditions',
        'Bounding box coordinates',
        'Fast processing speed'
      ]
    },
    {
      id: 'face-matching',
      title: 'Face Matching',
      icon: '/imgs/face_match.png',
      color: 'from-purple-400 to-purple-600',
      description: 'Compare and verify facial similarities between two images with industry-leading precision for secure identity verification.',
      features: [
        '1:1 face verification',
        'Similarity score calculation',
        'Deep learning algorithms',
        'Robust to aging and accessories',
        'Template comparison',
        'Fraud prevention'
      ]
    },
    {
      id: 'liveness',
      title: 'Liveness Detection',
      icon: '/imgs/Liveness_process.png',
      color: 'from-green-400 to-green-600',
      description: 'Ensure the person being verified is physically present and not using a photo, video, or mask for spoofing attempts.',
      features: [
        'Active liveness detection',
        'Passive liveness detection',
        'Anti-replay protection',
        'Motion detection',
        'Blink detection',
        'Challenge-response verification'
      ]
    },
    {
      id: 'antispoof',
      title: 'Anti-Spoof',
      icon: '/imgs/antispoof.png',
      color: 'from-red-400 to-red-600',
      description: 'Detect and prevent presentation attacks including photos, videos, masks, and deepfakes to ensure authentic user verification.',
      features: [
        'Print attack detection',
        'Digital replay prevention',
        '3D mask detection',
        'Deepfake detection',
        'Material analysis',
        'Multi-layer security'
      ]
    },
    {
      id: 'ocr',
      title: 'OCR',
      icon: '/imgs/ocr.png',
      color: 'from-orange-400 to-orange-600',
      description: 'Extract text from identity documents, passports, and cards with optical character recognition for automated data entry.',
      features: [
        'ID card text extraction',
        'Passport data reading',
        'Multi-language support',
        'Field detection',
        'Data validation',
        'High accuracy extraction'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative pt-24 pb-12 px-6">
        <button
          onClick={onBack}
          className="max-w-7xl mx-auto mb-8 flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{copy.backHome}</span>
        </button>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{copy.kycBadge}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">{copy.kycTitle}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {copy.kycSubtitle}
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {copy.kycIntro}
          </p>
        </div>
      </div>

      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {modules.map((module) => (
              <div
                key={module.id}
                className="group flex h-full flex-col bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
              >
                <div className="mb-6 h-[350px] w-[350px] flex shrink-0 items-center justify-center group-hover:scale-110 transition-transform">
                  {typeof module.icon === 'string' && module.icon.endsWith('.png') ? (
                    <a
                      href={module.icon}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-zoom-in"
                    >
                      <img src={module.icon} alt="" className="h-[350px] w-[350px] object-contain" />
                    </a>
                  ) : (
                    <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-3xl`}>
                      {module.icon}
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{module.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {module.description}
                </p>

                {selectedModule === module.id && (
                  <div className="mt-6 space-y-3">
                    <div className="text-sm font-semibold text-cyan-400 mb-3">KEY FEATURES:</div>
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="mt-auto pt-6 w-full py-3 bg-slate-800/50 hover:bg-cyan-600 border border-slate-700 hover:border-cyan-500 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2">
                  {selectedModule === module.id ? 'Hide Details' : 'View Details'}
                  <ArrowRight className={`w-4 h-4 transition-transform ${selectedModule === module.id ? 'rotate-90' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Complete KYC Workflow
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            All modules work seamlessly together to provide end-to-end identity verification
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {[
              { num: '1', title: 'Detect', desc: 'Face Detection' },
              { num: '2', title: 'Verify', desc: 'Face Matching' },
              { num: '3', title: 'Check', desc: 'Liveness' },
              { num: '4', title: 'Protect', desc: 'Anti-Spoof' },
              { num: '5', title: 'Extract', desc: 'OCR Data' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    {step.num}
                  </div>
                  <div className="font-bold text-white mb-1">{step.title}</div>
                  <div className="text-sm text-slate-400">{step.desc}</div>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Get Started with KYC Modules
          </button>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Implement KYC?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Contact us to learn more about our KYC verification solutions and pricing
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Contact Sales
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-medium transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const DEMO_SERVICES = [
  {
    id: 'face-detection',
    title: 'Face Detection',
    icon: '/imgs/Face-recognition.svg',
    description: 'Detect and locate faces in an image.',
    uploads: 1,
    uploadLabel: 'Upload a photo with a face',
  },
  {
    id: 'face-matching',
    title: 'Face Matching',
    icon: '/imgs/matching.png',
    iconScale: 1.25,
    description: 'Compare two faces and get a similarity score.',
    uploads: 2,
    uploadLabel: 'Upload two photos to compare',
  },
  {
    id: 'antispoof',
    title: 'Anti-Spoof',
    icon: '/imgs/spoof.png',
    description: 'Detect photo, video, or mask attacks.',
    uploads: 1,
    uploadLabel: 'Upload a photo to verify',
  },
  {
    id: 'ocr',
    title: 'OCR',
    icon: '/imgs/ocr-demo.png',
    description: 'Extract text from ID cards and documents.',
    uploads: 1,
    uploadLabel: 'Upload a document image',
  },
];

const DEMO_SERVICE_COPY = {
  fa: {
    'face-detection': {
      title: 'تشخیص چهره',
      description: 'تشخیص و مکان‌یابی چهره‌ها در تصویر.',
      uploadLabel: 'یک عکس دارای چهره آپلود کنید',
    },
    'face-matching': {
      title: 'تطبیق چهره',
      description: 'دو چهره را مقایسه کنید و امتیاز شباهت بگیرید.',
      uploadLabel: 'دو عکس برای مقایسه آپلود کنید',
    },
    antispoof: {
      title: 'تشخیص جعل',
      description: 'حملات عکس، ویدیو یا ماسک را تشخیص دهید.',
      uploadLabel: 'یک عکس برای بررسی آپلود کنید',
    },
    ocr: {
      title: 'استخراج متن',
      description: 'متن کارت شناسایی و مدارک را استخراج کنید.',
      uploadLabel: 'تصویر مدرک را آپلود کنید',
    },
  },
};

const DemoPage = ({ onBack, language }) => {
  const [selectedService, setSelectedService] = useState('antispoof');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const copy = getCopy(language);

  const localizedServices = DEMO_SERVICES.map((item) => ({
    ...item,
    ...(DEMO_SERVICE_COPY[language]?.[item.id] || {}),
  }));
  const service = localizedServices.find((s) => s.id === selectedService);

  const resetUploads = () => {
    setResult((prev) => {
      if (prev?.imageUrl) URL.revokeObjectURL(prev.imageUrl);
      return null;
    });
    setFiles([]);
    setPreviews([]);
  };

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    resetUploads();
  };

  const handleFileSelect = (index, e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFiles((prev) => {
        const next = [...prev];
        next[index] = file;
        return next;
      });
      setPreviews((prev) => {
        const next = [...prev];
        next[index] = reader.result;
        return next;
      });
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const next = [...prev];
      next[index] = undefined;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      next[index] = undefined;
      return next;
    });
    setResult(null);
  };

  const canAnalyze = () => {
    if (!service) return false;
    for (let i = 0; i < service.uploads; i++) {
      if (!files[i]) return false;
    }
    return true;
  };

  const runDemoAnalysis = async () => {
    if (!canAnalyze()) return;

    setLoading(true);
    setResult(null);

    try {
      if (selectedService === 'antispoof') {
        const formData = new FormData();
        formData.append('file', files[0]);

        const response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Analysis failed');
        }

        const data = await response.json();
        const isReal = data.success && data.prediction === 'real';

        setResult({
          status: isReal ? 'success' : 'warning',
          title: isReal ? 'Authentic Face' : 'Spoof Detected',
          message: isReal ? 'No spoof attack detected.' : 'Possible presentation attack detected.',
          details: [
            { label: 'Prediction', value: data.prediction || 'unknown' },
            { label: 'Confidence', value: data.score ? `${(data.score * 100).toFixed(1)}%` : 'N/A' },
          ],
        });
      } else if (selectedService === 'face-detection') {
        const formData = new FormData();
        formData.append('frame', files[0], files[0].name || 'frame.jpg');

        const response = await fetch('/api/process_imgSetting', {
          method: 'POST',
          body: formData,
        });

        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
          let errorMsg = `Face detection failed (${response.status})`;
          try {
            if (contentType.includes('application/json')) {
              const errorData = await response.json();
              errorMsg = errorData.detail || errorData.message || errorData.error || errorMsg;
            } else {
              const errorText = await response.text();
              if (errorText) errorMsg = errorText.slice(0, 200);
            }
          } catch {
            /* non-JSON error body */
          }
          throw new Error(errorMsg);
        }

        if (contentType.includes('image/')) {
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setResult({
            status: 'success',
            title: 'Face Detection Complete',
            message: 'Processed image returned from the API.',
            details: [{ label: 'Output', value: 'See processed image below' }],
            imageUrl,
          });
          return;
        }

        const data = await response.json();
        const faceCount =
          data.faces_count ??
          data.face_count ??
          data.num_faces ??
          (Array.isArray(data.faces) ? data.faces.length : undefined);

        const details = [];
        const skipKeys = new Set(['frame', 'image', 'processed_image', 'img', 'output_image']);

        if (faceCount !== undefined) {
          details.push({ label: 'Faces found', value: String(faceCount) });
        }

        Object.entries(data).forEach(([key, value]) => {
          if (skipKeys.has(key) || value === null || value === undefined) return;
          if (typeof value === 'string' && value.startsWith('data:image')) return;
          if (key === 'faces_count' || key === 'face_count' || key === 'num_faces') return;

          const formatted =
            typeof value === 'object' ? JSON.stringify(value) : String(value);
          details.push({
            label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            value: formatted,
          });
        });

        const detected = faceCount === undefined ? true : Number(faceCount) > 0;

        setResult({
          status: detected ? 'success' : 'warning',
          title: detected ? 'Faces Detected' : 'No Faces Detected',
          message: detected
            ? 'Face detection completed successfully.'
            : 'No faces were found in the uploaded image.',
          details,
        });
      } else if (selectedService === 'face-matching') {
        const formData = new FormData();
        formData.append('file1', files[0], files[0].name || 'file1.jpg');
        formData.append('file2', files[1], files[1].name || 'file2.jpg');

        const response = await fetch('https://railway-deploy--garibishahla.replit.app/compare', {
          method: 'POST',
          body: formData,
        });

 

        const contentType = response.headers.get('content-type') || '';
        let data = {};

        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = text ? { response: text.slice(0, 500) } : {};
        }

        if (!response.ok) {
          throw new Error(data.detail || data.message || data.error || `Face matching failed (${response.status})`);
        }

        const similarity =
          data.similarity ??
          data.similarity_score ??
          data.score ??
          data.confidence ??
          data.distance;
        const matched = data.match ?? data.matched ?? data.verified ?? data.is_match;
        const details = [];

        if (similarity !== undefined) {
          const numericSimilarity = Number(similarity);
          details.push({
            label: 'Similarity score',
            value: Number.isFinite(numericSimilarity)
              ? `${numericSimilarity <= 1 ? (numericSimilarity * 100).toFixed(1) : numericSimilarity.toFixed(1)}%`
              : String(similarity),
          });
        }

        if (matched !== undefined) {
          details.push({ label: 'Result', value: matched ? 'Verified' : 'Not verified' });
        }

        Object.entries(data).forEach(([key, value]) => {
          if (value === null || value === undefined) return;
          if (['similarity', 'similarity_score', 'score', 'confidence', 'distance', 'match', 'matched', 'verified', 'is_match'].includes(key)) return;
          const formatted = typeof value === 'object' ? JSON.stringify(value) : String(value);
          details.push({
            label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            value: formatted,
          });
        });
        setResult({
          status: matched === false ? 'warning' : 'success',
          title: matched === false ? 'Faces Do Not Match' : 'Face Matching Complete',
          message: 'Face matching completed successfully.',
          details,
        });
      } else if (selectedService === 'ocr') {
        await new Promise((r) => setTimeout(r, 1200));
        setResult({
          status: 'success',
          title: 'Text Extracted',
          message: 'Demo result — connect your OCR API for live output.',
          details: [
            { label: 'Document type', value: 'National ID' },
            { label: 'Name', value: 'John Doe' },
            { label: 'ID Number', value: 'AB1234567' },
            { label: 'Expiry', value: '2028-05-15' },
          ],
        });
      }
    } catch (error) {
      console.error('Demo analysis error:', error);
      const isNetworkError = error.message === 'Failed to fetch';
      setResult({
        status: 'error',
        title: 'Analysis Failed',
        message: isNetworkError
          ? 'Could not reach the API server. Check that it is running and restart the dev server after config changes.'
          : (error.message || 'Analysis failed. Please try again.'),
        details: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const statusStyles = {
    success: 'bg-green-900/20 border-green-700 text-green-400',
    warning: 'bg-red-900/20 border-red-700 text-red-400',
    error: 'bg-yellow-900/20 border-yellow-700 text-yellow-400',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{copy.backHome}</span>
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{copy.demoBadge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {copy.demoTitlePrefix} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{copy.demoTitleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {copy.demoText}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {localizedServices.map((item) => (
            <button
              key={item.id}
              onClick={() => handleServiceChange(item.id)}
              className={`min-w-0 overflow-hidden p-3 sm:p-5 rounded-xl border text-center flex flex-col items-center transition-all ${
                selectedService === item.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
              }`}
            >
              <div className="mb-3 flex aspect-square w-full max-w-[7.5rem] sm:max-w-36 shrink-0 items-center justify-center overflow-hidden">
                <img
                  src={item.icon}
                  alt=""
                  className="max-h-full max-w-full object-contain object-center"
                  style={{ transform: `scale(${item.iconScale ?? 1})` }}
                />
              </div>
              <div className="text-xs sm:text-sm font-semibold leading-snug">{item.title}</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">{service?.title}</h2>
            <p className="text-slate-400 mb-6">{service?.description}</p>

            <div className={`grid gap-4 ${service?.uploads === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {Array.from({ length: service?.uploads || 1 }).map((_, index) => (
                <div key={index}>
                  {service?.uploads === 2 && (
                    <p className="text-sm text-slate-400 mb-2">{copy.photo} {index + 1}</p>
                  )}
                  {!previews[index] ? (
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(index, e)}
                      />
                      <div className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-cyan-500 hover:bg-cyan-500/5 transition-all">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-cyan-400" />
                        <p className="font-medium mb-1">{service?.uploadLabel}</p>
                        <p className="text-slate-500 text-sm">{copy.uploadHint}</p>
                      </div>
                    </label>
                  ) : (
                    <div className="relative">
                      <img src={previews[index]} alt={`Upload ${index + 1}`} className="w-full h-48 sm:h-56 object-contain bg-slate-950 rounded-xl" />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-3 right-3 bg-black/70 hover:bg-black p-2 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="mt-2 text-sm text-slate-400 truncate">{files[index]?.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={runDemoAnalysis}
              disabled={!canAnalyze() || loading}
              className={`mt-6 w-full py-4 rounded-xl font-semibold transition-all ${
                !canAnalyze() || loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {copy.analyzing}
                </span>
              ) : (
                copy.runAnalysis
              )}
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">{copy.results}</h2>

            {!result && !loading && (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center text-slate-500">
                <Brain className="w-16 h-16 mb-4 text-slate-700" />
                <p>{copy.emptyResults}</p>
              </div>
            )}

            {loading && (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-400">
                <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>{copy.processing}</p>
              </div>
            )}

            {result && !loading && (
              <div className={`p-6 rounded-xl border ${statusStyles[result.status]}`}>
                <div className="flex items-start gap-3 mb-4">
                  {result.status === 'success' ? (
                    <CheckCircle className="w-8 h-8 shrink-0" />
                  ) : result.status === 'warning' ? (
                    <XCircle className="w-8 h-8 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 shrink-0" />
                  )}
                  <div>
                    <p className="text-xl font-bold text-white">{result.title}</p>
                    <p className="text-slate-300 mt-1">{result.message}</p>
                  </div>
                </div>

                {result.imageUrl && (
                  <img
                    src={result.imageUrl}
                    alt="Face detection result"
                    className="mt-4 w-full rounded-lg border border-slate-700"
                  />
                )}

                {result.details?.length > 0 && (
                  <div className="mt-4 space-y-3 bg-slate-950/50 rounded-lg p-4">
                    {result.details.map((row) => (
                      <div key={row.label} className="flex justify-between gap-4 text-sm">
                        <span className="text-slate-400">{row.label}</span>
                        <span className="text-white font-medium text-right">{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={resetUploads}
                  className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-all"
                >
                  {copy.reset}
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Images are processed securely and are not stored.
        </p>
      </div>
    </div>
  );
};

const PhotoUploadPage = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const data = await response.json();
      
      if (data.success && data.prediction === 'real') {
        setResult('accepted');
      } else if (data.success && data.prediction === 'fake') {
        setResult('send again');
      } else {
        setResult('error');
      }

    } catch (error) {
      console.error('Upload error:', error);
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Computer <span className="text-purple-500">Vision</span>
          </h1>
          <p className="text-gray-400">Upload your photo for AI analysis</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-purple-900/50 p-8">
          {!preview ? (
            <label className="block cursor-pointer">
              <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
              <div className="border-2 border-dashed border-purple-700 rounded-xl p-12 text-center hover:border-purple-500 transition-all hover:bg-purple-900/10">
                <Upload className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <p className="text-xl font-semibold mb-2">Click to upload photo</p>
                <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
              </div>
            </label>
          ) : (
            <>
              <div className="relative mb-6">
                <img src={preview} alt="Preview" className="w-full h-80 object-cover rounded-xl" />
                <button onClick={handleRemoveFile} className="absolute top-4 right-4 bg-black/80 hover:bg-black p-2 rounded-full transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-zinc-950 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileImage className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="font-semibold">{selectedFile?.name}</p>
                    <p className="text-sm text-gray-400">{(selectedFile?.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              </div>

              {result && (
                <div className={`mb-6 p-6 rounded-xl border ${
                  result === 'accepted' 
                    ? 'bg-green-900/20 border-green-700' 
                    : result === 'send again'
                    ? 'bg-red-900/20 border-red-700'
                    : 'bg-yellow-900/20 border-yellow-700'
                }`}>
                  <div className="flex items-center space-x-3">
                    {result === 'accepted' ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="text-xl font-bold text-green-500">Real Face Detected!</p>
                          <p className="text-gray-300">Your photo has been verified as authentic</p>
                        </div>
                      </>
                    ) : result === 'send again' ? (
                      <>
                        <XCircle className="w-8 h-8 text-red-500" />
                        <div>
                          <p className="text-xl font-bold text-red-500">Fake Face Detected</p>
                          <p className="text-gray-300">Please upload a real photo</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-yellow-500">An error occurred. Please try again.</p>
                    )}
                  </div>
                </div>
              )}

              {!result ? (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    loading ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Upload Photo'
                  )}
                </button>
              ) : (
                <button onClick={handleRemoveFile} className="w-full py-4 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition-all">
                  Upload Another Photo
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-center text-gray-500 text-sm">
            Your photos are processed securely and never stored
          </p>
          <p className="text-center text-gray-400 text-xs bg-zinc-900/50 border border-yellow-700/30 rounded-lg px-4 py-2">
            ⚠️ Content is user-generated and unverified
          </p>
        </div>
      </div>
    </div>
  );
};

const NeuralEdgeAI = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const contactEmail = 'shahla_garibi@yahoo.com';
  const copy = getCopy(language);
  const isPersian = language === 'fa';
  const toggleLanguage = () => setLanguage((current) => (current === 'en' ? 'fa' : 'en'));
  const languageToggle = <LanguageToggle language={language} onToggle={toggleLanguage} />;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() || 'Website visitor';
    const email = formData.get('email')?.toString().trim() || 'No email provided';
    const message = formData.get('message')?.toString().trim() || '';
    const subject = `New message from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (currentPage === 'kyc-modules') {
    return (
      <div dir={isPersian ? 'rtl' : 'ltr'}>
        {languageToggle}
        <KYCModulesPage language={language} onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  if (currentPage === 'demo') {
    return (
      <div dir={isPersian ? 'rtl' : 'ltr'}>
        {languageToggle}
        <DemoPage language={language} onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  if (currentPage === 'computer-vision') {
    return (
      <div dir={isPersian ? 'rtl' : 'ltr'}>
        {languageToggle}
        <PhotoUploadPage onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  return (
    <div dir={isPersian ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-950">
      {languageToggle}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 pr-32 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/imgs/logo.png" alt="Logo" className="h-16 md:h-20 w-auto object-contain" />
          </div>
          
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">{copy.navServices}</button>
            <button onClick={() => scrollToSection('products')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">{copy.navBlog}</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">{copy.navAbout}</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">{copy.navContact}</button>
            {/* <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Get Started
            </button> */}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8"> 
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300"> */}
            {/* <Sparkles className="w-4 h-4 text-cyan-400" /> */}
            {/* <span>Powered by Advanced AI Technology</span> */}
          {/* </div> */}

          <h1 className={`${isPersian ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-6xl md:text-7xl lg:text-8xl'} font-bold leading-tight`}>
            <div className="text-white">{copy.heroLine1}</div>
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {copy.heroLine2}
            </div>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {copy.heroText}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
              {copy.heroCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentPage('demo')}
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all"
            >
              {copy.heroDemo}
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">{copy.servicesTitle}</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {copy.servicesText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-10 hover:border-cyan-500/50 transition-all duration-300">
              <div className="mb-6">
                <img src="/imgs/medical.png" alt="" className="w-[500px] h-[300px] object-contain" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{copy.medicalTitle}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-lg">
                {copy.medicalText}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all text-lg">
                {copy.learnMore}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-10 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
                 onClick={() => setCurrentPage('kyc-modules')}>
              <div className="mb-6">
                <img src="/imgs/kyc.png" alt="" className="w-[500px] h-[300px] object-contain" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">KYC</h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-lg">
                {copy.kycText}
              </p>
              <span className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all text-lg">
                {copy.learnMore}
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">{copy.aboutTitle}</h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                {copy.aboutText}
              </p>

              <div className="space-y-4 mb-8">
                {copy.aboutPoints.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>

              {/* <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Learn About Our Team
              </button> */}
            </div>

            <div>
              <img src="/imgs/team.jpg" alt="Team" className="w-full rounded-3xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">{copy.contactTitle}</h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                
                {copy.contactText}
              </p>

              <div className="space-y-6">
                {[
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: contactEmail },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+98 (87) 33615478' },
                  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', text: 'sanandaj, BLV kurdistan ' }
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-lg">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{copy.name}</label>
                  <input type="text" id="name" name="name" required placeholder={copy.namePlaceholder} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{copy.email}</label>
                  <input type="email" id="email" name="email" required placeholder={copy.emailPlaceholder} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{copy.message}</label>
                  <textarea id="message" name="message" rows="6" required placeholder={copy.messagePlaceholder} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
                </div>

                <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                  {copy.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeuralEdgeAI;














// import React, { useState } from 'react';
// import { Upload, X, CheckCircle, XCircle, Sparkles, ArrowRight, ArrowLeft, Brain, FileImage } from 'lucide-react';

// const PhotoUploadPage = ({ onBack }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setSelectedFile(file);
//       setResult(null);
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setPreview(null);
//     setResult(null);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     setResult(null);

//     try {
//       // Create FormData and append the file
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       const response = await fetch('http://127.0.0.1:8000/predict', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Upload failed');
//       }

//       const data = await response.json();
      
//       // API returns: { success: true, prediction: "real" or "fake", score: 0.95, bbox: {...} }
//       if (data.success && data.prediction === 'real') {
//         setResult('accepted');
//       } else if (data.success && data.prediction === 'fake') {
//         setResult('send again');
//       } else {
//         setResult('error');
//       }

//     } catch (error) {
//       console.error('Upload error:', error);
//       setResult('error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative w-full max-w-2xl">
//         <button
//           onClick={onBack}
//           className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back to Home</span>
//         </button>

//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2">
//             Computer <span className="text-purple-500">Vision</span>
//           </h1>
//           <p className="text-gray-400">Upload your photo for AI analysis</p>
//         </div>

//         <div className="bg-zinc-900 rounded-2xl border border-purple-900/50 p-8">
//           {!preview ? (
//             <label className="block cursor-pointer">
//               <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
//               <div className="border-2 border-dashed border-purple-700 rounded-xl p-12 text-center hover:border-purple-500 transition-all hover:bg-purple-900/10">
//                 <Upload className="w-16 h-16 mx-auto mb-4 text-purple-500" />
//                 <p className="text-xl font-semibold mb-2">Click to upload photo</p>
//                 <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
//               </div>
//             </label>
//           ) : (
//             <>
//               <div className="relative mb-6">
//                 <img src={preview} alt="Preview" className="w-full h-80 object-cover rounded-xl" />
//                 <button onClick={handleRemoveFile} className="absolute top-4 right-4 bg-black/80 hover:bg-black p-2 rounded-full transition-all">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="flex items-center justify-between mb-6 p-4 bg-zinc-950 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <FileImage className="w-8 h-8 text-purple-500" />
//                   <div>
//                     <p className="font-semibold">{selectedFile?.name}</p>
//                     <p className="text-sm text-gray-400">{(selectedFile?.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                 </div>
//               </div>

//               {result && (
//                 <div className={`mb-6 p-6 rounded-xl border ${
//                   result === 'accepted' 
//                     ? 'bg-green-900/20 border-green-700' 
//                     : result === 'send again'
//                     ? 'bg-red-900/20 border-red-700'
//                     : 'bg-yellow-900/20 border-yellow-700'
//                 }`}>
//                   <div className="flex items-center space-x-3">
//                     {result === 'accepted' ? (
//                       <>
//                         <CheckCircle className="w-8 h-8 text-green-500" />
//                         <div>
//                           <p className="text-xl font-bold text-green-500">Real Face Detected!</p>
//                           <p className="text-gray-300">Your photo has been verified as authentic</p>
//                         </div>
//                       </>
//                     ) : result === 'send again' ? (
//                       <>
//                         <XCircle className="w-8 h-8 text-red-500" />
//                         <div>
//                           <p className="text-xl font-bold text-red-500">Fake Face Detected</p>
//                           <p className="text-gray-300">Please upload a real photo</p>
//                         </div>
//                       </>
//                     ) : (
//                       <p className="text-yellow-500">An error occurred. Please try again.</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {!result ? (
//                 <button
//                   onClick={handleUpload}
//                   disabled={loading}
//                   className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
//                     loading ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center space-x-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Processing...</span>
//                     </span>
//                   ) : (
//                     'Upload Photo'
//                   )}
//                 </button>
//               ) : (
//                 <button onClick={handleRemoveFile} className="w-full py-4 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition-all">
//                   Upload Another Photo
//                 </button>
//               )}
//             </>
//           )}
//         </div>

//         <div className="mt-6 space-y-2">
//           <p className="text-center text-gray-500 text-sm">
//             Your photos are processed securely and never stored
//           </p>
//           <p className="text-center text-gray-400 text-xs bg-zinc-900/50 border border-yellow-700/30 rounded-lg px-4 py-2">
//             ⚠️ Content is user-generated and unverified
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NeuralEdgeAI = () => {
//   const [currentPage, setCurrentPage] = useState('home');

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   if (currentPage === 'computer-vision') {
//     return <PhotoUploadPage onBack={() => setCurrentPage('home')} />;
//   }

//   return (
//     <div className="min-h-screen bg-slate-950">
//       <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold text-cyan-400">NeuralEdge AI</span>
//           </div>
          
//           <div className="flex items-center gap-8">
//             <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">Services</button>
//             <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">About</button>
//             <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">Contact</button>
//             <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>

//       <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-5xl mx-auto text-center space-y-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300">
//             <Sparkles className="w-4 h-4 text-cyan-400" />
//             <span>Powered by Advanced AI Technology</span>
//           </div>

//           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
//             <div className="text-white">Transform Your Business</div>
//             <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//               With AI Intelligence
//             </div>
//           </h1>

//           <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
//             We deliver cutting-edge artificial intelligence solutions that drive innovation,
//             enhance efficiency, and unlock unprecedented growth for your organization.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
//             <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
//               Start Your AI Journey
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all">
//               View Case Studies
//             </button>
//           </div>
//         </div>
//       </section>

//       <section id="services" className="py-24 px-6 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-white mb-4">Our AI Solutions</h2>
//             <p className="text-xl text-slate-400 max-w-3xl mx-auto">
//               Comprehensive artificial intelligence services tailored to your business needs
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Machine Learning</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Custom ML models that learn from your data and adapt to your business processes for intelligent automation.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Natural Language Processing</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Advanced NLP solutions for sentiment analysis, chatbots, and intelligent document processing.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
//                  onClick={() => setCurrentPage('computer-vision')}>
//               <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Computer Vision</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Image recognition, object detection, and visual AI systems for enhanced operational efficiency.
//               </p>
//               <span className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </span>
//             </div>

//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Predictive Analytics</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Data-driven forecasting and insights that help you make informed strategic decisions.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">AI Consulting</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Strategic guidance on AI implementation, from proof of concept to full-scale deployment.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">AI Integration</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Seamlessly integrate AI capabilities into your existing systems and workflows.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="about" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-5xl font-bold text-white mb-6">Leading the AI Revolution</h2>
//               <p className="text-xl text-slate-400 mb-8 leading-relaxed">
//                 We are a team of AI researchers, data scientists, and engineers passionate about building intelligent systems that solve real-world problems.
//               </p>

//               <div className="space-y-4 mb-8">
//                 {['Cutting-edge research and development', 'Industry-leading AI expertise', 'Proven track record of success', 'End-to-end AI implementation'].map((item, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <span className="text-slate-300 text-lg">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
//                 Learn About Our Team
//               </button>
//             </div>

//             <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
//               <div className="grid grid-cols-2 gap-6">
//                 {[
//                   { num: '10+', label: 'Years Experience' },
//                   { num: '500+', label: 'AI Projects' },
//                   { num: '50+', label: 'Team Members' },
//                   { num: '25+', label: 'Countries' }
//                 ].map((stat, idx) => (
//                   <div key={idx} className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
//                     <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
//                       {stat.num}
//                     </div>
//                     <div className="text-slate-400">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="contact" className="py-24 px-6 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             <div>
//               <h2 className="text-5xl font-bold text-white mb-6">Let's Build the Future Together</h2>
//               <p className="text-xl text-slate-400 mb-12 leading-relaxed">
//                 Ready to transform your business with AI? Get in touch with our team of experts.
//               </p>

//               <div className="space-y-6">
//                 {[
//                   { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'contact@neuraledge.ai' },
//                   { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+1 (555) 123-4567' },
//                   { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', text: 'San Francisco, CA' }
//                 ].map((contact, idx) => (
//                   <div key={idx} className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
//                       </svg>
//                     </div>
//                     <span className="text-slate-300 text-lg">{contact.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
//               <form className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
//                   <input type="text" id="name" placeholder="Your name" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
//                   <input type="email" id="email" placeholder="your@email.com" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors" />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
//                   <textarea id="message" rows="6" placeholder="Tell us about your project..." className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
//                 </div>

//                 <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default NeuralEdgeAI;
