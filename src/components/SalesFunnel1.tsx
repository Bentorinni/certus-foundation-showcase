import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Search, FileCheck, Handshake, ChevronRight } from 'lucide-react';

const SalesFunnel1: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Search, title: t('funnel1.step1.title'), desc: t('funnel1.step1.desc') },
    { icon: FileCheck, title: t('funnel1.step2.title'), desc: t('funnel1.step2.desc') },
    { icon: Handshake, title: t('funnel1.step3.title'), desc: t('funnel1.step3.desc') },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-dark">
      {/* Neon ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 20%, hsl(142 100% 50% / 0.1) 0%, transparent 50%),
                           radial-gradient(ellipse at 70% 80%, hsl(142 100% 50% / 0.06) 0%, transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column hero layout: text left, visual right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          {/* Left: headline + CTA */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-gold" />
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                {t('funnel1.tag')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight uppercase">
              {t('funnel1.title')}
            </h2>
            <p className="text-white/50 font-body text-lg mb-8 max-w-lg">{t('funnel1.subtitle')}</p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_50px_hsl(142_100%_50%/0.4)] hover:scale-[1.02] font-body"
            >
              {t('funnel1.cta')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </AnimatedSection>

          {/* Right: stacked step cards with left accent border */}
          <div className="space-y-5">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.2} direction="right">
                <div className="group relative flex items-center gap-5 glass rounded-xl p-6 transition-all duration-500 md:hover:border-accent/40 md:hover:shadow-[0_0_30px_hsl(142_100%_50%/0.1)]">
                  {/* Left neon bar */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-accent/60 group-hover:bg-accent group-hover:shadow-[0_0_12px_hsl(142_100%_50%/0.6)] transition-all duration-500" />

                  <div className="ml-3 flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-white/45 font-body text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-accent/30 flex-shrink-0 group-hover:text-accent/60 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesFunnel1;
