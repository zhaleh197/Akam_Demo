import { ArrowRight } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { go, href } from '../lib/router';
import { MODULES } from '../kyc/modules';

const CONTACT_EMAIL = 'shahla_garibi@yahoo.com';

const COPY = {
  en: {
    heroLine1: 'Transform Your Business',
    heroLine2: 'With AI Intelligence',
    heroText: 'We deliver cutting-edge artificial intelligence solutions that drive innovation, enhance efficiency, and unlock unprecedented growth for your organization.',
    heroCta: 'Start Your AI Journey',
    heroDemo: 'Try the KYC demo',
    servicesTitle: 'Our AI Solutions',
    servicesText: 'Comprehensive artificial intelligence services tailored to your business needs',
    medicalTitle: 'Medical Projects',
    medicalText: 'Advanced AI solutions for healthcare and medical imaging. From diagnosis assistance to patient data analysis, we provide cutting-edge technology for the medical field.',
    kycText: 'Know Your Customer solutions with AI-powered identity verification: ID card reading, face matching, liveness, anti-spoofing and document forensics - for secure, compliant onboarding.',
    learnMore: 'Learn more',
    openLab: 'Open the KYC Lab',
    modulesTitle: 'Every KYC module, live',
    modulesText: 'Each module of our identity verification service has its own interactive demo.',
    aboutTitle: 'Leading the AI Revolution',
    aboutText: 'We are a team of AI researchers, data scientists, and engineers passionate about building intelligent systems that solve real-world problems.',
    aboutPoints: ['Cutting-edge research and development', 'Industry-leading AI expertise', 'Proven track record of success', 'End-to-end AI implementation'],
    contactTitle: "Let's Build the Future Together",
    contactText: 'Ready to transform your business with AI? Get in touch with our team of experts.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your name',
    messagePlaceholder: 'Tell us about your project...',
    sendMessage: 'Send Message',
    address: 'Sanandaj, Kurdistan Blvd.',
  },
  fa: {
    heroLine1: 'کسب‌وکار خود را متحول کنید',
    heroLine2: 'با هوش مصنوعی',
    heroText: 'ما راهکارهای پیشرفته هوش مصنوعی ارائه می‌دهیم تا نوآوری، بهره‌وری و رشد پایدار برای سازمان شما ایجاد شود.',
    heroCta: 'شروع مسیر هوش مصنوعی',
    heroDemo: 'دموی احراز هویت',
    servicesTitle: 'راهکارهای هوش مصنوعی ما',
    servicesText: 'خدمات جامع هوش مصنوعی متناسب با نیازهای کسب‌وکار شما',
    medicalTitle: 'پروژه‌های پزشکی',
    medicalText: 'راهکارهای پیشرفته هوش مصنوعی برای سلامت و تصویربرداری پزشکی؛ از کمک به تشخیص تا تحلیل داده‌های بیمار.',
    kycText: 'احراز هویت مشتری با هوش مصنوعی: خواندن کارت ملی، تطبیق چهره، تشخیص زنده بودن، ضدجعل و جرم‌شناسی سند، برای ورود امن و سازگار با مقررات.',
    learnMore: 'بیشتر بدانید',
    openLab: 'ورود به آزمایشگاه KYC',
    modulesTitle: 'همهٔ ماژول‌های احراز هویت، به‌صورت زنده',
    modulesText: 'هر ماژول سرویس احراز هویت ما دموی تعاملی خودش را دارد.',
    aboutTitle: 'پیشرو در تحول هوش مصنوعی',
    aboutText: 'ما تیمی از پژوهشگران، دانشمندان داده و مهندسان هوش مصنوعی هستیم که برای حل مسائل واقعی سیستم‌های هوشمند می‌سازیم.',
    aboutPoints: ['پژوهش و توسعه پیشرفته', 'تخصص حرفه‌ای در هوش مصنوعی', 'سابقه موفق در پروژه‌ها', 'پیاده‌سازی کامل از ابتدا تا اجرا'],
    contactTitle: 'آینده را با هم بسازیم',
    contactText: 'برای تحول کسب‌وکار خود با هوش مصنوعی، با تیم متخصص ما در ارتباط باشید.',
    name: 'نام',
    email: 'ایمیل',
    message: 'پیام',
    namePlaceholder: 'نام شما',
    messagePlaceholder: 'درباره پروژه خود بنویسید...',
    sendMessage: 'ارسال پیام',
    address: 'سنندج، بلوار کردستان',
  },
};

const input =
  'w-full rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-cyan-500/50 focus:outline-none';

export default function Home() {
  const { lang, isFa, t } = useLang();
  const copy = COPY[lang];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name')?.toString().trim() || 'Website visitor';
    const email = form.get('email')?.toString().trim() || 'No email provided';
    const message = form.get('message')?.toString().trim() || '';
    const body = [`Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl space-y-8 text-center">
          <h1 className={`${isFa ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-5xl md:text-7xl lg:text-8xl'} font-bold leading-tight`}>
            <div className="text-white">{copy.heroLine1}</div>
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">{copy.heroLine2}</div>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-400">{copy.heroText}</p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50"
            >
              {copy.heroCta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </button>
            <button type="button" onClick={() => go('/kyc')} className="rounded-lg bg-white px-8 py-4 font-medium text-slate-900 transition-all hover:bg-slate-100">
              {copy.heroDemo}
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{copy.servicesTitle}</h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">{copy.servicesText}</p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500/50 md:p-10">
              <img src="/imgs/medical.png" alt="" className="mb-6 h-64 w-full object-contain" />
              <h3 className="mb-4 text-3xl font-bold text-white">{copy.medicalTitle}</h3>
              <p className="mb-6 flex-1 text-lg leading-relaxed text-slate-400">{copy.medicalText}</p>
              <button type="button" onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 text-lg text-cyan-400 transition-all hover:gap-3">
                {copy.learnMore}
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </button>
            </div>
            <a
              href={href('/kyc')}
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-pink-500/50 md:p-10"
            >
              <img src="/imgs/kyc.png" alt="" className="mb-6 h-64 w-full object-contain" />
              <h3 className="mb-4 text-3xl font-bold text-white">KYC</h3>
              <p className="mb-6 flex-1 text-lg leading-relaxed text-slate-400">{copy.kycText}</p>
              <span className="inline-flex items-center gap-2 text-lg text-cyan-400 transition-all group-hover:gap-3">
                {copy.openLab}
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800/60 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">{copy.modulesTitle}</h2>
              <p className="text-slate-400">{copy.modulesText}</p>
            </div>
            <a href={href('/kyc')} className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3">
              {copy.openLab}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {MODULES.map((m) => (
              <a
                key={m.id}
                href={href(`/kyc/${m.id}`)}
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-colors hover:border-cyan-500/50"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${m.accent} text-white`}>
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-white">{t(...m.title)}</span>
                  <span className="block truncate text-xs text-slate-500">{t(...m.tagline)}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">{copy.aboutTitle}</h2>
            <p className="mb-8 text-xl leading-relaxed text-slate-400">{copy.aboutText}</p>
            <div className="space-y-4">
              {copy.aboutPoints.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <img src="/imgs/team.jpg" alt="" className="w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section id="contact" className="bg-slate-950 px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">{copy.contactTitle}</h2>
            <p className="mb-12 text-xl leading-relaxed text-slate-400">{copy.contactText}</p>
            <div className="space-y-6">
              {[
                ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', CONTACT_EMAIL, true],
                ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', '+98 (87) 33615478', true],
                ['M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', copy.address, false],
              ].map(([icon, text, ltr]) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/50">
                    <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                  </div>
                  <span dir={ltr ? 'ltr' : undefined} className="text-lg text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">{copy.name}</label>
                <input type="text" id="name" name="name" required placeholder={copy.namePlaceholder} className={input} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">{copy.email}</label>
                <input type="email" id="email" name="email" required dir="ltr" placeholder="your@email.com" className={input} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">{copy.message}</label>
                <textarea id="message" name="message" rows="6" required placeholder={copy.messagePlaceholder} className={`${input} resize-none`} />
              </div>
              <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50">
                {copy.sendMessage}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
