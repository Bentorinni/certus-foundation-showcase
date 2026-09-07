import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Shield, Award, Scale } from 'lucide-react';
import EuropeMap from './EuropeMap';

const About: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    { icon: Award, label: t('about.license') },
    { icon: Shield, label: t('about.insurance') },
    { icon: Scale, label: t('about.legal') },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: text + map integrated */}
        <div className="lg:hidden">
          <AnimatedSection direction="left">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-gold" />
              <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                {t('about.tag')}
              </span>
            </div>
            <h2 className="text-3xl font-display font-bold leading-tight mb-6">
              {t('about.title')}
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.2}>
            <div className="relative pl-5 border-l-2 border-accent mb-6">
              <p className="text-foreground font-body text-lg leading-relaxed font-medium">
                {t('about.p1')}
              </p>
            </div>
          </AnimatedSection>

          {/* Map on mobile - large and prominent */}
          <AnimatedSection delay={0.3}>
            <div className="relative my-8 overflow-hidden">
              <div className="w-full aspect-[4/3]">
                <EuropeMap />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.4}>
            <div className="space-y-4">
              <p className="text-muted-foreground font-body leading-relaxed text-base">
                {t('about.p2')}
              </p>
              <p className="text-muted-foreground font-body leading-relaxed text-base">
                {t('about.p3')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.5}>
            <div className="flex flex-wrap gap-3 mt-8">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm font-body"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Desktop layout: side by side */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-gradient-gold" />
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                  {t('about.tag')}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-8">
                {t('about.title')}
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-6">
                <div className="relative pl-5 border-l-2 border-accent">
                  <p className="text-foreground font-body text-lg leading-relaxed font-medium">
                    {t('about.p1')}
                  </p>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed text-base">
                  {t('about.p2')}
                </p>
                <p className="text-muted-foreground font-body leading-relaxed text-base">
                  {t('about.p3')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.4}>
              <div className="flex flex-wrap gap-4 mt-8">
                {badges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm font-body"
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right column - Europe Map */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-[700px] aspect-[4/3]">
                <EuropeMap />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
