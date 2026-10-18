import SiteNav from './components/SiteNav';
import { KycProvider } from './kyc/KycProvider';
import { LangProvider } from './lib/LangProvider';
import { useLang } from './lib/i18n';
import { useRoute } from './lib/router';
import { moduleById } from './kyc/modules';
import Home from './pages/Home';
import KycLab from './pages/KycLab';
import ModulePage from './pages/ModulePage';

// Routes: #/            landing
//         #/kyc         KYC Lab (all modules + connection)
//         #/kyc/<id>    one module's demo (ids in kyc/modules.js)
function Shell() {
  const path = useRoute();
  const { t } = useLang();
  const [, section, id] = path.split('/');

  let page = <Home />;
  if (section === 'kyc') page = moduleById(id) ? <ModulePage key={id} id={id} /> : <KycLab />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteNav active={section === 'kyc' ? 'kyc' : null} />
      <main>{page}</main>
      <footer className="border-t border-slate-800/60 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {t('Akam · AI solutions', 'اکام · راهکارهای هوش مصنوعی')}
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <KycProvider>
        <Shell />
      </KycProvider>
    </LangProvider>
  );
}
