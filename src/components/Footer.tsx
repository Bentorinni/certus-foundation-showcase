import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);

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
    <>
      <footer className="bg-primary text-primary-foreground pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-xl sm:text-2xl font-display font-bold">
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
              © 2016-2026 FUNDUS CERTUS. {t('footer.rights')}
            </p>
            <p className="text-sm text-primary-foreground/50 font-body">
              Strona stworzona przez:{' '}
              <a href="https://gishdev.pl" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors duration-300">GishDev</a>
            </p>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-sm text-primary-foreground/50 hover:text-accent font-body transition-colors duration-300 underline underline-offset-4 decoration-primary-foreground/20 hover:decoration-accent"
            >
              {t('footer.privacy')}
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">{t('footer.privacy')}</DialogTitle>
            <DialogDescription className="sr-only">
              {t('footer.privacy')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-foreground/80 font-body leading-relaxed">
            <p>
              Administratorem danych osobowych jest FUNDUS CERTUS z siedzibą w Polsce. 
              Dane osobowe przetwarzane są zgodnie z Rozporządzeniem Parlamentu Europejskiego 
              i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
            </p>
            <h3 className="font-semibold text-foreground">1. Zakres zbieranych danych</h3>
            <p>
              Zbieramy dane osobowe podane dobrowolnie za pośrednictwem formularza kontaktowego: 
              imię i nazwisko, adres e-mail, numer telefonu oraz treść wiadomości.
            </p>
            <h3 className="font-semibold text-foreground">2. Cel przetwarzania danych</h3>
            <p>
              Dane osobowe przetwarzane są w celu udzielenia odpowiedzi na zapytania, 
              świadczenia usług pośrednictwa w obrocie nieruchomościami, zarządzania 
              nieruchomościami oraz realizacji obowiązków prawnych.
            </p>
            <h3 className="font-semibold text-foreground">3. Okres przechowywania</h3>
            <p>
              Dane przechowywane są przez okres niezbędny do realizacji celów, dla których 
              zostały zebrane, nie dłużej niż 5 lat od ostatniego kontaktu.
            </p>
            <h3 className="font-semibold text-foreground">4. Prawa użytkownika</h3>
            <p>
              Użytkownik ma prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, 
              ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec 
              przetwarzania. W celu realizacji tych praw prosimy o kontakt mailowy.
            </p>
            <h3 className="font-semibold text-foreground">5. Pliki cookies i Google Analytics</h3>
            <p>
              Strona wykorzystuje pliki cookies, w tym cookies Google Analytics, w celu 
              analizy ruchu na stronie i poprawy jakości świadczonych usług. Google Analytics 
              zbiera anonimowe dane dotyczące sposobu korzystania ze strony (np. odwiedzane 
              podstrony, czas wizyty, źródło ruchu).
            </p>
            <p>
              Przy pierwszej wizycie użytkownik jest pytany o zgodę na wykorzystanie plików 
              cookies analitycznych. Użytkownik może w każdej chwili zmienić swoją decyzję, 
              usuwając dane z przeglądarki lub zmieniając ustawienia cookies. Odrzucenie zgody 
              powoduje, że żadne dane analityczne nie są zbierane.
            </p>
            <h3 className="font-semibold text-foreground">6. Kontakt</h3>
            <p>
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem 
              e-mail: funduscertus@gmail.com
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
