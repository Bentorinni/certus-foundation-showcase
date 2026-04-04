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

        {/* LAYOUT: Zigzag — alternating image-side blocks */}
        <div className="space-y-12 mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Icon block */}
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-[0_0_40px_hsl(142_100%_50%/0.2)] relative">
                  <step.icon className="w-12 h-12 md:w-16 md:h-16 text-accent-foreground" />
                </div>

                {/* Content */}
                <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <h3 className="text-2xl font-display font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>

              {/* Separator */}
              {i < steps.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="w-px h-8 bg-border" />
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(145_100%_45%/0.3)] hover:scale-[1.02] font-body"
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
