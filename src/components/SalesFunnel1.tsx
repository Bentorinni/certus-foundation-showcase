import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const SalesFunnel1: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { num: '01', title: t('funnel1.step1.title'), desc: t('funnel1.step1.desc') },
    { num: '02', title: t('funnel1.step2.title'), desc: t('funnel1.step2.desc') },
    { num: '03', title: t('funnel1.step3.title'), desc: t('funnel1.step3.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-dark">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('funnel1.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {t('funnel1.title')}
          </h2>
          <p className="text-white/50 font-body max-w-2xl mx-auto">{t('funnel1.subtitle')}</p>
        </AnimatedSection>

        {/* LAYOUT: 3 columns with numbered cards and arrows — GRID CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.2}>
              <div className="relative">
                <div className="glass rounded-xl p-8 h-full">
                  <div className="text-5xl font-display font-bold text-accent/20 mb-4">{step.num}</div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed">{step.desc}</p>
                  <CheckCircle2 className="w-5 h-5 text-accent mt-4" />
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10">
                    <ArrowRight className="w-8 h-8 text-accent/30" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(38_100%_50%/0.3)] hover:scale-[1.02] font-body"
          >
            {t('funnel1.cta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SalesFunnel1;
