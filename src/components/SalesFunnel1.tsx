import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Search, FileCheck, Handshake } from 'lucide-react';

const SalesFunnel1: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, title: t('funnel1.step1.title'), desc: t('funnel1.step1.desc') },
    { icon: FileCheck, title: t('funnel1.step2.title'), desc: t('funnel1.step2.desc') },
    { icon: Handshake, title: t('funnel1.step3.title'), desc: t('funnel1.step3.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-dark">
      {/* Neon glow background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, hsl(142 100% 50% / 0.08) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 80%, hsl(142 100% 50% / 0.05) 0%, transparent 40%)`,
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

        {/* LAYOUT: Horizontal process flow with connecting neon lines */}
        <div className="relative mb-16">
          {/* Connecting line behind cards */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-accent/20" />
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-accent/40 blur-sm" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.2}>
                <div className="group relative flex flex-col items-center text-center">
                  {/* Glowing icon circle */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-150 group-hover:bg-accent/30 transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-full border-2 border-accent/60 bg-accent/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/20 group-hover:shadow-[0_0_30px_hsl(142_100%_50%/0.4)] transition-all duration-500">
                      <step.icon className="w-9 h-9 text-accent" />
                    </div>
                  </div>
                  {/* Content card */}
                  <div className="glass rounded-xl p-6 w-full transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_hsl(142_100%_50%/0.1)]">
                    <h3 className="text-xl font-display font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-white/50 font-body text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_50px_hsl(142_100%_50%/0.4)] hover:scale-[1.02] font-body"
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
