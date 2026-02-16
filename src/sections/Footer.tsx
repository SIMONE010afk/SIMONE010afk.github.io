import { ChartNoAxesCombined, Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../lib/language';

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    navigation: [
      { label: language === 'it' ? 'Home' : 'Home', href: '#home' },
      { label: language === 'it' ? 'Progetti' : 'Projects', href: '#projects' },
      { label: language === 'it' ? 'Competenze' : 'Skills', href: '#skills' },
      { label: language === 'it' ? 'Contatti' : 'Contact', href: '#contact' },
    ],
    focus: [
      { label: 'Machine Learning', href: '#projects' },
      { label: 'Data Engineering', href: '#projects' },
      { label: language === 'it' ? 'Agenti AI' : 'AI Agents', href: '#projects' },
      { label: 'NLP & Vision', href: '#projects' },
    ],
    networks: [
      { label: 'GitHub', href: 'https://github.com/SIMONE010afk' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simone-torrengo' },
    ],
  };

  return (
    <footer className="bg-[#1f1f1f] text-white relative">
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0070a0] to-[#2c90c9] flex items-center justify-center">
                  <ChartNoAxesCombined className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-lg">Simone Torrengo</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {language === 'it'
                  ? 'Data analyst e AI specialist con background matematico e sportivo.'
                  : 'Data analyst and AI specialist with a mathematical and sports background.'}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs text-gray-400">{language === 'it' ? 'Lingua' : 'Language'}:</span>
                <button
                  onClick={() => setLanguage('it')}
                  className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
                    language === 'it'
                      ? 'bg-[#0070a0] border-[#0070a0] text-white'
                      : 'bg-transparent border-gray-600 text-gray-300 hover:border-[#0070a0]'
                  }`}
                >
                  IT
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
                    language === 'en'
                      ? 'bg-[#0070a0] border-[#0070a0] text-white'
                      : 'bg-transparent border-gray-600 text-gray-300 hover:border-[#0070a0]'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-[#0070a0] transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </div>
                {language === 'it' ? 'Torna su' : 'Back to top'}
              </button>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'it' ? 'Navigazione' : 'Navigation'}</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0070a0] to-[#2c90c9] group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'it' ? 'Focus' : 'Focus'}</h4>
              <ul className="space-y-3">
                {footerLinks.focus.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0070a0] to-[#2c90c9] group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">{language === 'it' ? 'Reti' : 'Networks'}</h4>
              <ul className="space-y-3">
                {footerLinks.networks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0070a0] to-[#2c90c9] group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="section-padding py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              <p>
                {language === 'it'
                  ? `Copyright ${new Date().getFullYear()} Simone Torrengo. Tutti i diritti riservati.`
                  : `Copyright ${new Date().getFullYear()} Simone Torrengo. All rights reserved.`}
              </p>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              {language === 'it' ? 'Fatto con' : 'Made with'}{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />{' '}
              {language === 'it' ? 'a Torino' : 'in Turin'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}