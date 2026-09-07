import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

const privacySections = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const;
const gdprSections = ['s1', 's2', 's3', 's4', 's5'] as const;

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [gdprOpen, setGdprOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClass = "text-sm text-primary-foreground/50 hover:text-accent font-body transition-colors duration-300 underline underline-offset-4 decoration-primary-foreground/20 hover:decoration-accent";

  return (
    <>
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-xl sm:text-2xl font-display font-bold notranslate" translate="no">
                FUNDUS <span className="text-gradient-gold">CERTUS</span>
              </span>
              <p className="text-xs text-primary-foreground/40 font-body mt-2">
                {t('footer.license')}
              </p>
            </div>
            <nav className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-primary-foreground/60 hover:text-accent font-body transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="h-px w-full bg-primary-foreground/10 mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50 font-body">
              <span className="notranslate" translate="no">© 2016-2026 FUNDUS CERTUS.</span> {t('footer.rights')}
            </p>
            <p className="text-sm text-primary-foreground/50 font-body">
              {t('footer.createdBy')}{' '}
              <a href="https://gishdev.pl" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors duration-300">GishDev</a>
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setPrivacyOpen(true)} className={linkClass}>
                {t('footer.privacy')}
              </button>
              <span className="text-primary-foreground/20">|</span>
              <button onClick={() => setGdprOpen(true)} className={linkClass}>
                {t('footer.gdpr')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">{t('privacy.title')}</DialogTitle>
            <DialogDescription className="sr-only">{t('privacy.title')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground/80 font-body leading-relaxed">
            <p>{t('privacy.admin')}</p>
            {privacySections.map((section) => (
              <div key={section}>
                <h3 className="font-semibold text-foreground">{t(`privacy.${section}.title`)}</h3>
                <p className="whitespace-pre-line">{t(`privacy.${section}.text`)}</p>
                {t(`privacy.${section}.list`) !== `privacy.${section}.list` && (
                  <p className="whitespace-pre-line mt-1">{t(`privacy.${section}.list`)}</p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* GDPR / RODO Dialog */}
      <Dialog open={gdprOpen} onOpenChange={setGdprOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">{t('gdpr.title')}</DialogTitle>
            <DialogDescription className="sr-only">{t('gdpr.title')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground/80 font-body leading-relaxed">
            <p>{t('gdpr.intro')}</p>
            {gdprSections.map((section) => (
              <div key={section}>
                <h3 className="font-semibold text-foreground">{t(`gdpr.${section}.title`)}</h3>
                <p className="whitespace-pre-line">{t(`gdpr.${section}.text`)}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
