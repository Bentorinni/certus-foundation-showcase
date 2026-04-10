import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import qrCode from '../assets/qr-code-new.png';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.success'));
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
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
                <button
                  type="submit"
                  className="group w-full bg-gradient-gold text-accent-foreground py-4 rounded-lg font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.3)] hover:scale-[1.01] font-body"
                >
                  <Send className="w-4 h-4" />
                  {t('contact.send')}
                </button>
              </form>

              {/* QR Code */}
              <div className="relative p-6 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all duration-300 group text-center mt-6">
                <div className="inline-block p-3 bg-white rounded-xl shadow-md mb-3 group-hover:shadow-accent/20 transition-shadow">
                  <img src={qrCode} alt="QR Code - Fundus Certus" className="w-28 h-28 object-contain" />
                </div>
                <p className="font-display font-bold text-base mb-1">{t('contact.qrTitle')}</p>
                <p className="text-muted-foreground text-xs font-body">{t('contact.qrSubtitle')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Info + Map */}
          <AnimatedSection direction="right">
            <div className="flex flex-col h-full">
              {/* Contact info */}
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
                    <p className="text-muted-foreground text-sm font-body group-hover:text-accent transition-colors">funduscertus@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Google Maps - fills remaining space */}
              <div className="rounded-xl overflow-hidden border border-border flex-1 min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.5!2d19.0258!3d50.2471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0x123456789!2sul.+J.+Lig%C4%99zy+12%2C+40-551+Katowice!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fundus Certus office location"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
