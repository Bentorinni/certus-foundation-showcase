import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, MapPin, BarChart3, Handshake, Building } from 'lucide-react';

const SalesFunnel4: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: MapPin, title: t('funnel4.step1.title'), desc: t('funnel4.step1.desc') },
    { icon: BarChart3, title: t('funnel4.step2.title'), desc: t('funnel4.step2.desc') },
    { icon: Handshake, title: t('funnel4.step3.title'), desc: t('funnel4.step3.desc') },
    { icon: Building, title: t('funnel4.step4.title'), desc: t('funnel4.step4.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-dark">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 60%, hsl(145 100% 45% / 0.1) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('funnel4.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {t('funnel4.title')}
          </h2>
          <p className="text-white/50 font-body max-w-2xl mx-auto">{t('funnel4.subtitle')}</p>
        </AnimatedSection>

        {/* LAYOUT: 2x2 grid — equal width boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group glass rounded-xl p-8 h-full flex flex-col transition-all duration-500 md:hover:border-accent/40 <div className="group glass rounded-xl p-8 h-full flex flex-col transition-all duration-500 md:hover:border-accent/40 md:hover:shadow-[0_0_30px_hsl(142_100%_50%/0.1)]">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 mb-4">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/45 font-body text-sm leading-relaxed flex-1">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(142_100%_50%/0.3)] hover:scale-[1.02] font-body"
          >
            {t('funnel4.cta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SalesFunnel4;
