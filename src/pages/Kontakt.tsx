import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, languageNames } from '../i18n/translations';
import { MapPin, Phone, Mail, Link2, ArrowLeft, Download, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpinningGlobe from '../components/SpinningGlobe';

const Kontakt: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Jarosław Dziedzic
ORG:FUNDUS CERTUS REAL ESTATE
TEL;TYPE=CELL:+48793747447
EMAIL:funduscertus@gmail.com
URL:https://funduscertus.eu/
ADR;TYPE=WORK:;;J.Ligęzy 12;Katowice;;40-551;POLSKA
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jaroslaw_Dziedzic_FundusCertus.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Header */}
      <header className="relative overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 50%, hsl(145 100% 45% / 0.12) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('kontakt.back')}
            </Link>

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
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
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

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12">
              <SpinningGlobe />
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold">
              Jarosław Dziedzic
            </h1>
          </div>
          <p className="text-primary-foreground/70 font-body text-base sm:text-lg tracking-wide uppercase font-semibold">
            FUNDUS CERTUS REAL ESTATE
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 pb-16">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-display font-bold mb-6 text-center">{t('kontakt.infoTitle')}</h2>

          <a
            href="tel:+48793747447"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
          >
            <Phone className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-sm font-body text-foreground">+48 793747447</p>
              <p className="text-muted-foreground text-xs font-body">{t('kontakt.phone')}</p>
            </div>
          </a>

          <a
            href="mailto:funduscertus@gmail.com"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
          >
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <p className="font-semibold text-sm font-body text-foreground group-hover:text-accent transition-colors">funduscertus@gmail.com</p>
          </a>

          <a
            href="https://funduscertus.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
          >
            <Link2 className="w-5 h-5 text-accent shrink-0" />
            <p className="font-semibold text-sm font-body text-foreground group-hover:text-accent transition-colors">https://funduscertus.eu/</p>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border">
            <MapPin className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="font-semibold text-sm font-body text-foreground">J.Ligęzy 12 Katowice, 40-551 POLSKA</p>
              <p className="text-muted-foreground text-xs font-body">{t('kontakt.address')}</p>
            </div>
          </div>

          <button
            onClick={handleSaveContact}
            className="group w-full bg-gradient-gold text-accent-foreground py-4 rounded-xl font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.3)] hover:scale-[1.01] font-body mt-6"
          >
            <Download className="w-4 h-4" />
            {t('kontakt.saveContact')}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Kontakt;
