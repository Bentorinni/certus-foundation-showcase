import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, languageNames } from '../i18n/translations';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import SpinningGlobe from './SpinningGlobe';

const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#home', '#about', '#services', '#testimonials', '#contact'];
      let current = '#home';
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg border-b border-border/20" aria-label="Nawigacja główna">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 sm:gap-3 group" aria-label="Fundus Certus — strona główna">
            <div className="h-9 w-9 sm:h-14 sm:w-14 flex items-center justify-center">
              <SpinningGlobe />
            </div>
            <span className="text-lg sm:text-3xl font-display font-extrabold tracking-tight notranslate" translate="no">
              <span className="text-primary-foreground">FUNDUS</span>
              <span className="text-gradient-gold"> CERTUS</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-accent'
                    : 'text-primary-foreground/70 hover:text-accent'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-gold rounded-full" />
                )}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors text-primary-foreground/70 hover:text-primary-foreground"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[160px]">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                        language === lang ? 'text-accent font-semibold bg-secondary' : 'text-foreground/80'
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-primary-foreground"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-card/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeSection === link.href
                  ? 'text-accent bg-secondary'
                  : 'text-foreground/80 hover:text-accent hover:bg-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex flex-wrap gap-2 px-4">
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsMobileOpen(false); }}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    language === lang
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-foreground/60 hover:border-accent'
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
