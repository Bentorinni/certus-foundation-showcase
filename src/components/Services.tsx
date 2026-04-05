import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Shield, Building2, Home, Users, Film } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Shield, title: t('services.recovery.title'), desc: t('services.recovery.desc') },
    { icon: Building2, title: t('services.brokerage.title'), desc: t('services.brokerage.desc') },
    { icon: Home, title: t('services.management.title'), desc: t('services.management.desc') },
    { icon: Users, title: t('services.partners.title'), desc: t('services.partners.desc') },
    { icon: Film, title: t('services.film.title'), desc: t('services.film.desc') },
  ];

  const renderCard = (service: typeof services[0], i: number) => (
    <AnimatedSection key={i} delay={i * 0.1}>
      <div className="group relative bg-card border border-border rounded-xl p-8 h-full transition-all duration-500 md:hover:border-accent/30 md:hover:shadow-[0_0_40px_hsl(142_100%_50%/0.08)]">
        <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
          <service.icon className="w-6 h-6 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
        <p className="text-muted-foreground font-body text-sm leading-relaxed">{service.desc}</p>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </AnimatedSection>
  );

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('services.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
            {t('services.title')}
          </h2>
        </AnimatedSection>

        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((s, i) => renderCard(s, i))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mt-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
          {services.slice(3).map((s, i) => renderCard(s, i + 3))}
        </div>

        {/* Mobile & Tablet: single column on mobile, 2-col centered on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {services.slice(0, 4).map((s, i) => renderCard(s, i))}
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:max-w-[50%] mx-auto lg:hidden">
          {services.slice(4).map((s, i) => renderCard(s, i + 4))}
        </div>
      </div>
    </section>
  );
};

export default Services;
