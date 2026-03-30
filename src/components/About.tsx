import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Shield, Award, Scale } from 'lucide-react';
import aboutBg from '../assets/about-bg.jpg';

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

          {/* Right column - real estate photo */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <img
                  src={aboutBg}
                  alt="Modern real estate interior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
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
