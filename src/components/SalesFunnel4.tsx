import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, MapPin, BarChart3, Handshake, Building } from 'lucide-react';

const SalesFunnel4: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: MapPin, title: t('funnel4.step1.title'), desc: t('funnel4.step1.desc'), color: 'from-accent/20 to-accent/5' },
    { icon: BarChart3, title: t('funnel4.step2.title'), desc: t('funnel4.step2.desc'), color: 'from-accent/15 to-accent/5' },
    { icon: Handshake, title: t('funnel4.step3.title'), desc: t('funnel4.step3.desc'), color: 'from-accent/20 to-accent/5' },
    { icon: Building, title: t('funnel4.step4.title'), desc: t('funnel4.step4.desc'), color: 'from-accent/15 to-accent/5' },
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-dark">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 60%, hsl(38 100% 50% / 0.12) 0%, transparent 60%)`,
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

        {/* Zigzag layout */}
        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`flex items-center gap-8 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-[0_0_30px_hsl(38_100%_50%/0.25)]">
                  <step.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <div className="flex-1 glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent text-xs font-bold tracking-wider font-body">KROK {i + 1}</span>
                    <div className="h-px flex-1 bg-accent/20" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7} className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-gold text-accent-foreground px-10 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_40px_hsl(38_100%_50%/0.3)] hover:scale-[1.02] font-body"
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
