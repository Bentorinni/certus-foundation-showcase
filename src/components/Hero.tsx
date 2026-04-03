import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { ArrowRight, Building2 } from 'lucide-react';
import SpinningGlobe from './SpinningGlobe';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Spinning Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <SpinningGlobe />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 70% 50%, hsl(38 100% 50% / 0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-px w-12 bg-gradient-gold" />
              <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase font-body">
                Fundus Certus
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-8 drop-shadow-lg">
              {t('hero.title')}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed mb-12 max-w-2xl font-body drop-shadow-md">
              {t('hero.subtitle')}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-gold text-accent-foreground px-8 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(38_100%_50%/0.3)] hover:scale-[1.02] font-body"
              >
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:border-accent/50 hover:text-accent backdrop-blur-sm bg-primary-foreground/5 font-body"
              >
                {t('hero.cta2')}
                <Building2 className="w-4 h-4" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
