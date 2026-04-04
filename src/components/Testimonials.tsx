import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Weber',
    company: 'Weber Immobilien GmbH',
    country: '🇩🇪',
    text: {
      pl: 'Fundus Certus pomógł nam znaleźć idealną nieruchomość komercyjną w Warszawie. Profesjonalizm i znajomość rynku na najwyższym poziomie.',
      en: 'Fundus Certus helped us find the perfect commercial property in Warsaw. Professionalism and market knowledge at the highest level.',
      de: 'Fundus Certus hat uns geholfen, die perfekte Gewerbeimmobilie in Warschau zu finden. Professionalität und Marktkenntnisse auf höchstem Niveau.',
      it: 'Fundus Certus ci ha aiutato a trovare la proprietà commerciale perfetta a Varsavia. Professionalità e conoscenza del mercato ai massimi livelli.',
      ru: 'Fundus Certus помогли нам найти идеальную коммерческую недвижимость в Варшаве. Профессионализм и знание рынка на высшем уровне.',
    },
  },
  {
    name: 'Giovanni Rossi',
    company: 'Rossi Investments S.r.l.',
    country: '🇮🇹',
    text: {
      pl: 'Dzięki współpracy z Fundus Certus udało nam się z powodzeniem wejść na polski rynek. Kompleksowa obsługa i pełne wsparcie prawne.',
      en: 'Thanks to cooperation with Fundus Certus, we successfully entered the Polish market. Comprehensive service and full legal support.',
      de: 'Dank der Zusammenarbeit mit Fundus Certus konnten wir erfolgreich in den polnischen Markt eintreten. Umfassender Service und volle rechtliche Unterstützung.',
      it: 'Grazie alla collaborazione con Fundus Certus, siamo entrati con successo nel mercato polacco. Servizio completo e pieno supporto legale.',
      ru: 'Благодаря сотрудничеству с Fundus Certus мы успешно вышли на польский рынок. Комплексное обслуживание и полная юридическая поддержка.',
    },
  },
  {
    name: 'Алексей Петров',
    company: 'East-West Trading LLC',
    country: '🇷🇺',
    text: {
      pl: 'Fundus Certus to wiarygodny partner w międzynarodowym biznesie. Pomogali nam w każdym etapie inwestycji — od analizy do finalizacji.',
      en: 'Fundus Certus is a reliable partner in international business. They helped us at every stage of the investment — from analysis to finalization.',
      de: 'Fundus Certus ist ein zuverlässiger Partner im internationalen Geschäft. Sie haben uns in jeder Phase der Investition unterstützt.',
      it: 'Fundus Certus è un partner affidabile nel business internazionale. Ci hanno aiutato in ogni fase dell\'investimento.',
      ru: 'Fundus Certus — надёжный партнёр в международном бизнесе. Помогали нам на каждом этапе инвестиции — от анализа до финализации.',
    },
  },
];

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('testimonials.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
            {t('testimonials.title')}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="relative bg-card border border-border rounded-xl p-8 h-full group hover:border-accent/30 transition-all duration-500">
                <Quote className="w-8 h-8 text-accent/20 mb-4" />
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                  {item.text[language]}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.country}</span>
                    <div>
                      <p className="font-semibold text-sm font-body">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{item.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
