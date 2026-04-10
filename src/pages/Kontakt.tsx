import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, languageNames } from '../i18n/translations';
import { MapPin, Phone, Mail, Link2, ArrowLeft, Download, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import qrCode from '../assets/qr-code-new.png';
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
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 70% 50%, hsl(145 100% 45% / 0.12) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('kontakt.back')}
            </Link>

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

          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12">
              <SpinningGlobe />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold">
                Jarosław Dziedzic
              </h1>
            </div>
          </div>
          <p className="text-primary-foreground/70 font-body text-base sm:text-lg tracking-wide uppercase font-semibold">
            FUNDUS CERTUS REAL ESTATE
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold mb-6">{t('kontakt.infoTitle')}</h2>

            <a
              href="tel:+48793747447"
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">+48 793747447</p>
                <p className="text-muted-foreground text-xs font-body">{t('kontakt.phone')}</p>
              </div>
            </a>

            <a
              href="mailto:funduscertus@gmail.com"
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground group-hover:text-accent transition-colors">funduscertus@gmail.com</p>
              </div>
            </a>

            <a
              href="https://funduscertus.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <Link2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground group-hover:text-accent transition-colors">https://funduscertus.eu/</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border">
              <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">J.Ligęzy 12 Katowice, 40-551 POLSKA</p>
                <p className="text-muted-foreground text-xs font-body">{t('kontakt.address')}</p>
              </div>
            </div>

            {/* Save Contact Button */}
            <button
              onClick={handleSaveContact}
              className="group w-full bg-gradient-gold text-accent-foreground py-4 rounded-xl font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.3)] hover:scale-[1.01] font-body mt-6"
            >
              <Download className="w-4 h-4" />
              {t('kontakt.saveContact')}
            </button>
          </div>

          {/* Right: QR + Map */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-secondary border border-border text-center">
              <div className="inline-block p-3 bg-white rounded-xl shadow-md mb-3">
                <img src={qrCode} alt="QR Code - Fundus Certus" className="w-36 h-36 object-contain" />
              </div>
              <p className="font-display font-bold text-base mb-1 text-foreground">{t('contact.qrTitle')}</p>
              <p className="text-muted-foreground text-xs font-body">{t('contact.qrSubtitle')}</p>
            </div>

            <div className="rounded-xl overflow-hidden border border-border min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.5!2d19.0258!3d50.2471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0x123456789!2sul.+J.+Lig%C4%99zy+12%2C+40-551+Katowice!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fundus Certus office location"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Kontakt;
