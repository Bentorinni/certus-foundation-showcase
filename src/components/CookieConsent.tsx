import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const GA_ID = 'G-XXXXXXXXXX'; // Replace with actual GA ID

const loadGoogleAnalytics = () => {
  if (document.getElementById('ga-script')) return;
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_ID);
  };
};

const removeGoogleAnalytics = () => {
  const script = document.getElementById('ga-script');
  if (script) script.remove();
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('_ga') || name.startsWith('_gid')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
};

const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGoogleAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    removeGoogleAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground font-body leading-relaxed">
            {t('cookies.message')}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-body rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors duration-200"
          >
            {t('cookies.reject')}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-body rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
