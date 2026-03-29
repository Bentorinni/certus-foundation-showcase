import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Shield, Award, Scale } from 'lucide-react';

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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <AnimatedSection direction="left">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-gradient-gold" />
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
                  {t('about.tag')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-8">
                {t('about.title')}
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
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

          {/* Right column - decorative */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-dark overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, hsl(38 100% 50% / 0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 70%, hsl(38 100% 50% / 0.15) 0%, transparent 50%)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                                     linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl font-display font-bold text-gradient-gold opacity-30">FC</div>
                    <div className="mt-4 text-white/30 text-sm font-body tracking-[0.3em] uppercase">
                      Est. 2009
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/20 rounded-2xl -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
