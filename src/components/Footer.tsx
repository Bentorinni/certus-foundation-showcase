import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-2xl font-display font-bold">
              FUNDUS <span className="text-gradient-gold">CERTUS</span>
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/60 font-body">
              © {new Date().getFullYear()} FUNDUS CERTUS. {t('footer.rights')}
            </p>
            <p className="text-xs text-primary-foreground/40 font-body mt-1">
              {t('footer.license')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
