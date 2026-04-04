import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Search, Target, Rocket } from 'lucide-react';

const SalesFunnel2: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, title: t('funnel2.step1.title'), desc: t('funnel2.step1.desc') },
    { icon: Target, title: t('funnel2.step2.title'), desc: t('funnel2.step2.desc') },
    { icon: Rocket, title: t('funnel2.step3.title'), desc: t('funnel2.step3.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('funnel2.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t('funnel2.title')}
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">{t('funnel2.subtitle')}</p>
        </AnimatedSection>

        {/* LAYOUT: Vertical timeline — alternating left/right */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {steps.map((step, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.2}
              direction={i % 2 === 0 ? 'left' : 'right'}
              className="relative mb-12 last:mb-0"
            >
              <div className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-card border border-border rounded-xl p-6 ml-16 md:ml-0 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.06)]">
                    <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center z-10 shadow-[0_0_20px_hsl(142_100%_50%/0.3)]">
                  <step.icon className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-16">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-primary text-primary-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] font-body border border-border"
          >
            {t('funnel2.cta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SalesFunnel2;
