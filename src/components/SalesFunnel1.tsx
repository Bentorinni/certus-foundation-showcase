import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Search, FileCheck, Handshake } from 'lucide-react';

const SalesFunnel1: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, num: '01', title: t('funnel1.step1.title'), desc: t('funnel1.step1.desc') },
    { icon: FileCheck, num: '02', title: t('funnel1.step2.title'), desc: t('funnel1.step2.desc') },
    { icon: Handshake, num: '03', title: t('funnel1.step3.title'), desc: t('funnel1.step3.desc') },
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

        {/* LAYOUT: Horizontal 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="glass rounded-xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-accent/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <span className="text-accent/50 text-xs font-bold tracking-[0.3em] uppercase font-body mb-2">
                  {step.num}
                </span>
                <h3 className="text-xl font-display font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 font-body text-sm leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(145_100%_45%/0.3)] hover:scale-[1.02] font-body"
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
