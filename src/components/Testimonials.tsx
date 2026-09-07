import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Star, Quote, Building2 } from 'lucide-react';

const testimonials = [
  {
    name: 'A-STAVMAT POLSKA Sp. z o.o.',
    isCompany: true,
    text: {
      pl: 'Bardzo sympatyczna obsługa. Rzetelne informacje i bardzo korzystne ceny za usługi. Zachęcam każdego do skorzystania z ofert. W szybkim czasie można uzyskać wiele ciekawych ofert, a także skorzystać z profesjonalnego doradztwa. POLECAM!!',
      en: 'Very friendly service. Reliable information and very competitive prices for services. I encourage everyone to take advantage of the offers. In a short time you can get many interesting offers, as well as professional advice. HIGHLY RECOMMEND!!',
      de: 'Sehr freundlicher Service. Zuverlässige Informationen und sehr wettbewerbsfähige Preise. Ich empfehle jedem, die Angebote zu nutzen. SEHR EMPFEHLENSWERT!!',
      it: 'Servizio molto cordiale. Informazioni affidabili e prezzi molto competitivi. Consiglio a tutti di approfittare delle offerte. CONSIGLIATISSIMO!!',
      ru: 'Очень дружелюбное обслуживание. Надёжная информация и очень конкурентоспособные цены. Рекомендую всем воспользоваться предложениями. НАСТОЯТЕЛЬНО РЕКОМЕНДУЮ!!',
    },
  },
  {
    name: 'Hanna Paulose',
    isCompany: false,
    text: {
      pl: 'Mieliśmy szczęście wynająć mieszkanie od Fundus Certus na nasz pobyt w Katowicach. Bardzo zadbane i dobrze wyposażone mieszkanie w normalnej cenie. Doceniamy uczciwość Jarosława. Najlepsza obsługa, jakiej mogliśmy oczekiwać — dostępny nawet w nocy, bardzo profesjonalny. Na pewno wrócimy!',
      en: 'We were lucky to rent apartment from Fundus Certus for our stay in Katowice. A very well maintained and well furnished apartment at the normal price. We appreciate the integrity of Jaroslaw. We had the best service we could have hoped for. Jaroslaw was available to answer our questions even at night, and was very professional. We will definitely be back!',
      de: 'Wir hatten das Glück, eine Wohnung von Fundus Certus für unseren Aufenthalt in Kattowitz zu mieten. Eine sehr gepflegte und gut eingerichtete Wohnung zum normalen Preis. Wir schätzen die Integrität von Jaroslaw. Wir werden definitiv wiederkommen!',
      it: 'Siamo stati fortunati ad affittare un appartamento da Fundus Certus per il nostro soggiorno a Katowice. Un appartamento molto ben mantenuto e arredato a prezzo normale. Apprezziamo l\'integrità di Jaroslaw. Torneremo sicuramente!',
      ru: 'Нам повезло арендовать квартиру у Fundus Certus для проживания в Катовицах. Очень ухоженная и хорошо обставленная квартира по нормальной цене. Мы ценим честность Ярослава. Мы обязательно вернёмся!',
    },
  },
  {
    name: 'Marek Kun',
    isCompany: false,
    text: {
      pl: 'Bardzo szybka odpowiedź, profesjonalna obsługa i pomoc w wynajmie nieruchomości, gorąco polecam.',
      en: 'Very fast response, professional service and help with property rental, highly recommend.',
      de: 'Sehr schnelle Antwort, professioneller Service und Hilfe bei der Immobilienvermietung, sehr empfehlenswert.',
      it: 'Risposta molto rapida, servizio professionale e aiuto con l\'affitto di immobili, consiglio vivamente.',
      ru: 'Очень быстрый ответ, профессиональное обслуживание и помощь в аренде недвижимости, горячо рекомендую.',
    },
  },
];

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="testimonials" aria-label="Opinie klientów" className="py-24 lg:py-32 bg-gradient-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-gold" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase font-body">
              {t('testimonials.tag')}
            </span>
            <div className="h-px w-8 bg-gradient-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white uppercase">
            {t('testimonials.title')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="relative glass rounded-xl p-8 h-full group transition-all duration-500 md:hover:border-accent/30">
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <p className="text-white/50 font-body text-sm leading-relaxed mb-6">
                  {item.text[language]}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    {item.isCompany ? (
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-white/60 font-semibold text-sm">
                          {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm font-body text-white notranslate" translate="no">{item.name}</p>
                      <p className="text-xs text-white/40 font-body">
                        {item.isCompany
                          ? (language === 'pl' ? 'Firma' : language === 'de' ? 'Unternehmen' : language === 'it' ? 'Azienda' : language === 'ru' ? 'Компания' : 'Company')
                          : (language === 'pl' ? 'Klient prywatny' : language === 'de' ? 'Privatkunde' : language === 'it' ? 'Cliente privato' : language === 'ru' ? 'Частный клиент' : 'Private client')
                        }
                      </p>
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
