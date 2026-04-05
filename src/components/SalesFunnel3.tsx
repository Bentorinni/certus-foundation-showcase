import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Home, Key, FileText, TrendingUp } from 'lucide-react';

const SalesFunnel3: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Home, title: t('funnel3.step1.title'), desc: t('funnel3.step1.desc') },
    { icon: FileText, title: t('funnel3.step2.title'), desc: t('funnel3.step2.desc') },
    { icon: Key, title: t('funnel3.step3.title'), desc: t('funnel3.step3.desc') },
    { icon: TrendingUp, title: t('funnel3.step4.title'), desc: t('funnel3.step4.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('funnel3.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t('funnel3.title')}
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">{t('funnel3.subtitle')}</p>
        </AnimatedSection>

        {/* LAYOUT: 4-column grid with top accent line + large icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.12}>
              <div className="group relative bg-card border border-border rounded-xl overflow-hidden h-full transition-all duration-500 md:hover:border-accent/40 md:hover:shadow-[0_0_30px_hsl(142_100%_50%/0.08)]">
                {/* Top neon accent bar */}
                <div className="h-1 w-full bg-gradient-gold opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-7 flex flex-col items-start">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_hsl(142_100%_50%/0.2)] transition-all duration-300">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(142_100%_50%/0.3)] hover:scale-[1.02] font-body"
          >
            {t('funnel3.cta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SalesFunnel3;
