import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin, Phone, Mail, Globe, Shield, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import qrCode from '../assets/qr-code-new.png';
import SpinningGlobe from '../components/SpinningGlobe';

const Kontakt: React.FC = () => {
  const { t } = useLanguage();

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
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('kontakt.back')}
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12">
              <SpinningGlobe />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-display font-bold">
                <span className="text-primary-foreground">FUNDUS</span>
                <span className="text-gradient-gold"> CERTUS</span>
              </h1>
            </div>
          </div>

          <p className="text-primary-foreground/70 font-body text-sm sm:text-base max-w-2xl">
            {t('kontakt.subtitle')}
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
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.phone')}</p>
                <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">+48 793 747 447</p>
              </div>
            </a>

            <a
              href="mailto:funduscertus@gmail.com"
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.email')}</p>
                <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">funduscertus@gmail.com</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border">
              <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.address')}</p>
                <p className="text-muted-foreground text-sm font-body">ul. J. Ligęzy 12, 40-551 Katowice</p>
              </div>
            </div>

            <a
              href="https://funduscertus.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              <Globe className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.website')}</p>
                <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">funduscertus.eu</p>
              </div>
            </a>

            {/* License & Insurance */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border">
              <Shield className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.license')}</p>
                <p className="text-muted-foreground text-sm font-body">{t('kontakt.licenseValue')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary border border-border">
              <FileText className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm font-body text-foreground">{t('kontakt.insurance')}</p>
                <p className="text-muted-foreground text-sm font-body">{t('kontakt.insuranceValue')}</p>
              </div>
            </div>
          </div>

          {/* Right: QR + Map */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="p-6 rounded-xl bg-secondary border border-border text-center">
              <div className="inline-block p-3 bg-white rounded-xl shadow-md mb-3">
                <img src={qrCode} alt="QR Code - Fundus Certus" className="w-36 h-36 object-contain" />
              </div>
              <p className="font-display font-bold text-base mb-1 text-foreground">{t('contact.qrTitle')}</p>
              <p className="text-muted-foreground text-xs font-body">{t('contact.qrSubtitle')}</p>
            </div>

            {/* Google Maps */}
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
