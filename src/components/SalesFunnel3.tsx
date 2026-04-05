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

  const positions = [
    'lg:col-start-1 lg:row-start-1',
    'lg:col-start-3 lg:row-start-1',
    'lg:col-start-1 lg:row-start-2',
    'lg:col-start-3 lg:row-start-2',
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
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

        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.12}
                className={positions[i]}
              >
                <div className="group relative bg-card border border-border rounded-xl overflow-hidden h-full transition-all duration-500 md:hover:border-accent/40 md:hover:shadow-[0_0_30px_hsl(142_100%_50%/0.08)]">
                  <div className="p-6 flex flex-col h-full">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_hsl(142_100%_50%/0.2)] transition-all duration-300">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">{step.desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </AnimatedSection>
            ))}

            {/* Central hub */}
            <AnimatedSection
              delay={0.3}
              className="lg:col-start-2 lg:row-start-1 lg:row-span-2 flex items-center justify-center order-first lg:order-none"
            >
              <div className="relative w-full h-full min-h-[220px] lg:min-h-0 flex items-center justify-center">
                {/* Glow rings */}
                <div className="absolute w-48 h-48 rounded-full border border-accent/10 animate-pulse" />
                <div className="absolute w-36 h-36 rounded-full border border-accent/20" />
                <div className="absolute w-24 h-24 rounded-full bg-accent/5 border border-accent/30 shadow-[0_0_40px_hsl(142_100%_50%/0.15)]" />

                {/* Arrows from center to cards */}
                <svg className="absolute inset-0 w-full h-full hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <marker id="arrowTL" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="1" />
                    </marker>
                    <marker id="arrowTR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="1" />
                    </marker>
                    <marker id="arrowBL" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="1" />
                    </marker>
                    <marker id="arrowBR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(142 100% 50% / 0.5)" strokeWidth="1" />
                    </marker>
                  </defs>
                  {/* Center to top-left card center */}
                  <line x1="50" y1="50" x2="0" y2="25" stroke="hsl(142 100% 50% / 0.3)" strokeWidth="0.8" markerEnd="url(#arrowTL)" />
                  {/* Center to top-right card center */}
                  <line x1="50" y1="50" x2="100" y2="25" stroke="hsl(142 100% 50% / 0.3)" strokeWidth="0.8" markerEnd="url(#arrowTR)" />
                  {/* Center to bottom-left card center */}
                  <line x1="50" y1="50" x2="0" y2="75" stroke="hsl(142 100% 50% / 0.3)" strokeWidth="0.8" markerEnd="url(#arrowBL)" />
                  {/* Center to bottom-right card center */}
                  <line x1="50" y1="50" x2="100" y2="75" stroke="hsl(142 100% 50% / 0.3)" strokeWidth="0.8" markerEnd="url(#arrowBR)" />
                  {/* Center dot */}
                  <circle cx="50" cy="50" r="1.5" fill="hsl(142 100% 50% / 0.6)" />
                </svg>

                {/* Center icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-[0_0_50px_hsl(142_100%_50%/0.3)]">
                  <Home className="w-8 h-8 text-accent-foreground" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.7} className="text-center">
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
