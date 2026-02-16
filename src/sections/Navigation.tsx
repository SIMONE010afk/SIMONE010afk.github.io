import { useState, useEffect } from 'react';
import { ChartNoAxesCombined, Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/language';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();

  const navLinks = [
    { label: language === 'it' ? 'Home' : 'Home', href: '#home' },
    { label: language === 'it' ? 'Progetti' : 'Projects', href: '#projects' },
    { label: language === 'it' ? 'Competenze' : 'Skills', href: '#skills' },
    { label: language === 'it' ? 'Contatti' : 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-lg shadow-black/5 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-padding">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2 group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#0070a0] to-[#2c90c9]' 
                  : 'bg-white/20 backdrop-blur-sm'
              }`}>
                  <ChartNoAxesCombined className="w-5 h-5 text-white" />
              </div>
              <span className={`font-semibold text-lg transition-colors ${
                isScrolled ? 'text-[#1f1f1f]' : 'text-[#1f1f1f]'
              }`}>
                Simone Torrengo
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled 
                      ? 'text-[#33383f] hover:text-[#0070a0]' 
                      : 'text-[#33383f] hover:text-[#0070a0]'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#0070a0] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#0070a0] text-white hover:bg-[#004968]'
                    : 'bg-[#0070a0] text-white hover:bg-[#004968]'
                }`}
              >
                {language === 'it' ? 'Contattami' : 'Contact me'}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center bg-[#f7f9fa]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#1f1f1f]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1f1f1f]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div 
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-[#1f1f1f] font-medium hover:bg-[#e6f7ff] hover:text-[#0070a0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#dee5eb]">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="block w-full text-center px-5 py-3 rounded-xl bg-[#0070a0] text-white font-medium hover:bg-[#004968] transition-colors"
            >
              {language === 'it' ? 'Contattami' : 'Contact me'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
