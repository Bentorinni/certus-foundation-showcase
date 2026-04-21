import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

const privacySections = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const;
const gdprSections = ['s1', 's2', 's3', 's4', 's5'] as const;

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [sending, setSending] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [gdprOpen, setGdprOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setSending(true);
    try {
      const res = await fetch('https://funduscertus.eu/contact-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(t('contact.success'));
        setForm({ name: '', email: '', phone: '', message: '', website: '' });
        setConsent(false);
      } else {
        toast.error(data.error || 'Wystąpił błąd przy wysyłaniu.');
      }
    } catch {
      toast.error('Nie udało się połączyć z serwerem.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" aria-label="Kontakt" className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-gold" />
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                {t('contact.tag')}
              </span>
              <div className="h-px w-8 bg-gradient-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 uppercase">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">{t('contact.subtitle')}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Left: Form + QR */}
            <AnimatedSection direction="left">
              <div className="flex flex-col h-full">
                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                  {/* Honeypot — hidden from humans, bots fill it */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium font-body mb-2">{t('contact.name')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium font-body mb-2">{t('contact.email')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-body mb-2">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium font-body mb-2">{t('contact.message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                    <label htmlFor="consent" className="text-xs text-muted-foreground font-body leading-relaxed cursor-pointer">
                      {t('contact.consentPre')}
                      <button
                        type="button"
                        onClick={() => setPrivacyOpen(true)}
                        className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors"
                      >
                        {t('contact.consentPrivacyLink')}
                      </button>
                      {t('contact.consentMid')}
                      <button
                        type="button"
                        onClick={() => setGdprOpen(true)}
                        className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors"
                      >
                        {t('contact.consentGdprLink')}
                      </button>
                      {t('contact.consentPost')}
                    </label>
                  </div>
                  {consentError && (
                    <p className="text-xs text-destructive font-body">{t('contact.consentRequired')}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="group w-full bg-gradient-gold text-accent-foreground py-4 rounded-lg font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.3)] hover:scale-[1.01] font-body disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? 'Wysyłanie...' : t('contact.send')}
                  </button>
                </form>

                {/* QR Code */}
                <div className="relative p-6 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group text-center mt-6">
                  <div className="inline-block p-3 bg-white rounded-xl shadow-md mb-3 group-hover:shadow-accent/20 transition-shadow">
                    <QRCodeSVG value="https://funduscertus.eu/contact" size={112} level="M" />
                  </div>
                  <p className="font-display font-bold text-base mb-1">{t('contact.qrTitle')}</p>
                  <p className="text-muted-foreground text-xs font-body">{t('contact.qrSubtitle')}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Info + Map */}
            <AnimatedSection direction="right">
              <div className="flex flex-col h-full">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm font-body">{t('contact.address')}</p>
                      <p className="text-muted-foreground text-sm font-body">{t('contact.addressValue')}</p>
                    </div>
                  </div>
                  <a
                    href="tel:+48793747447"
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:border-accent/50 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm font-body">Telefon</p>
                      <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">+48 793 747 447</p>
                    </div>
                  </a>
                  <a
                    href="mailto:funduscertus@gmail.com"
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:border-accent/50 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm font-body">E-mail</p>
                      <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors notranslate" translate="no">funduscertus@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/48793747447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:border-accent/50 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <div>
                      <p className="font-semibold text-sm font-body">WhatsApp</p>
                      <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">{t('contact.whatsappDesc')}</p>
                    </div>
                  </a>
                  <a
                    href="https://teams.microsoft.com/l/chat/0/0?users=funduscertus@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:border-accent/50 transition-colors group"
                  >
                    <svg className="w-5 h-5 text-accent mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.625 8.127a2.876 2.876 0 1 0-2.964-2.876 2.876 2.876 0 0 0 2.964 2.876Zm2.654 1.36h-5.997a.36.36 0 0 0-.36.36v5.422a3.808 3.808 0 0 0 2.93 3.83 3.706 3.706 0 0 0 4.475-3.622V10.21a.722.722 0 0 0-.722-.722h-.326ZM15.504 8.85a3.706 3.706 0 1 0-3.706-3.706 3.706 3.706 0 0 0 3.706 3.706Zm.49 1.36H7.452a.97.97 0 0 0-.97.97v8.36a5.13 5.13 0 0 0 4.066 5.078 4.998 4.998 0 0 0 5.93-4.91v-8.528a.97.97 0 0 0-.97-.97h-.514ZM5.998 9.487H.722A.722.722 0 0 0 0 10.21v6.78a3.706 3.706 0 0 0 3.706 3.706 3.706 3.706 0 0 0 3.706-3.706v-6.78a.722.722 0 0 0-.722-.722h-.692Z"/>
                    </svg>
                    <div>
                      <p className="font-semibold text-sm font-body">Microsoft Teams</p>
                      <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors notranslate" translate="no">funduscertus@gmail.com</p>
                    </div>
                  </a>
                </div>

                <div className="rounded-xl overflow-hidden border border-border flex-1 min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.5!2d19.0258!3d50.2471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0x123456789!2sul.+J.+Lig%C4%99zy+12%2C+40-551+Katowice!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokalizacja biura Fundus Certus"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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

export default Contact;
