import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';
import { Phone, Mail, MapPin, ArrowLeft, User, Building2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../assets/logo.png';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.15-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.797.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.943L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TeamsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.625 8.04h-7.5c-.621 0-1.125.504-1.125 1.125v9.375c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125V9.165c0-.621-.504-1.125-1.125-1.125z"/>
    <path d="M22.5 5.79c0 1.035-.84 1.875-1.875 1.875h-.375V5.79c0-.207.168-.375.375-.375s.375.168.375.375z"/>
    <path d="M20.625 3.54h.375c.207 0 .375.168.375.375v1.5h-.375c-.621 0-1.125-.504-1.125-1.125s.504-1.125 1.125-1.125z"/>
    <path d="M8.625 5.79H1.125C.504 5.79 0 6.294 0 6.915v9.375c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125V6.915c0-.621-.504-1.125-1.125-1.125z"/>
    <path d="M10.5 14.79v-5.25c0-.621.504-1.125 1.125-1.125h.375v7.5h-.375c-.621 0-1.125-.504-1.125-1.125z"/>
  </svg>
);

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const contactData = {
    name: 'Jarosław Dziedzic',
    company: 'FUNDUS CERTUS REAL ESTATE',
    phone: '+48 793 747 447',
    rawPhone: '+48793747447',
    email: 'funduscertus@gmail.com',
    address: 'ul. J. Ligęzy 12, 40-551 Katowice',
    website: 'https://funduscertus.eu/',
  };

  const generateVCard = () => {
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactData.name}`,
      `ORG:${contactData.company}`,
      `TEL;TYPE=CELL:${contactData.rawPhone}`,
      `EMAIL:${contactData.email}`,
      `ADR;TYPE=WORK:;;${contactData.address};;;;`,
      `URL:${contactData.website}`,
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fundus-certus-contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t('contactPage.vcardSuccess'));
  };

  const contactOptions = [
    {
      icon: Phone,
      label: t('contactPage.phoneLabel'),
      value: contactData.phone,
      href: `tel:${contactData.rawPhone}`,
    },
    {
      icon: Mail,
      label: t('contactPage.emailLabel'),
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: WhatsAppIcon,
      label: t('contactPage.whatsappLabel'),
      value: contactData.phone,
      href: `https://wa.me/${contactData.rawPhone.replace(/\+/g, '')}`,
      external: true,
    },
    {
      icon: TeamsIcon,
      label: t('contactPage.teamsLabel'),
      value: t('contactPage.teamsValue'),
      href: `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(contactData.email)}`,
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full flex items-center justify-center p-0.5 sm:p-1 logo-float-3d">
                <img src={logo} alt="Fundus Certus" className="h-full w-full object-contain" />
              </div>
              <span className="text-lg sm:text-3xl font-display font-extrabold tracking-tight">
                <span className="text-primary-foreground">FUNDUS</span>
                <span className="text-gradient-gold"> CERTUS</span>
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('contactPage.backHome')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-gold" />
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                {t('contactPage.tag')}
              </span>
              <div className="h-px w-8 bg-gradient-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 uppercase">
              {t('contactPage.title')}
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-xl mx-auto">
              {t('contactPage.subtitle')}
            </p>
          </AnimatedSection>

          {/* Contact person card */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 text-center backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 border border-white/10 mb-4">
                <User className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold mb-1 text-primary-foreground">{contactData.name}</h2>
              <div className="flex items-center justify-center gap-2 text-accent font-semibold mb-4">
                <Building2 className="w-4 h-4" />
                <span className="uppercase tracking-wide text-sm">{contactData.company}</span>
              </div>
              <p className="text-primary-foreground/60 font-body text-sm flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                {contactData.address}
              </p>
            </div>
          </AnimatedSection>

          {/* Contact options grid */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                const linkProps = option.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <a
                    key={index}
                    href={option.href}
                    {...linkProps}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-primary-foreground/50 font-body uppercase tracking-wide">
                        {option.label}
                      </p>
                      <p className="text-sm font-semibold text-primary-foreground font-body truncate group-hover:text-accent transition-colors">
                        {option.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Save contact button */}
          <AnimatedSection delay={0.3} className="text-center">
            <button
              onClick={generateVCard}
              className="inline-flex items-center gap-2 bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.3)] hover:scale-[1.02] font-body"
            >
              <Download className="w-4 h-4" />
              {t('contactPage.saveContact')}
            </button>
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} FUNDUS CERTUS. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;