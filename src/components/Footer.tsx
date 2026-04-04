import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

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

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Logo + Nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <span className="text-xl sm:text-2xl font-display font-bold">
              FUNDUS <span className="text-gradient-gold">CERTUS</span>
            </span>
            <p className="text-xs text-primary-foreground/40 font-body mt-2">
              {t('footer.license')}
            </p>
          </div>

          {/* Navigation */}
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

        {/* Divider */}
        <div className="h-px w-full bg-primary-foreground/10 mb-8" />

        {/* Bottom: Copyright + Privacy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} FUNDUS CERTUS. {t('footer.rights')}
          </p>
          <button
            onClick={() => {/* TODO: link to privacy policy page */}}
            className="text-sm text-primary-foreground/50 hover:text-accent font-body transition-colors duration-300 underline underline-offset-4 decoration-primary-foreground/20 hover:decoration-accent"
          >
            {t('footer.privacy')}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
