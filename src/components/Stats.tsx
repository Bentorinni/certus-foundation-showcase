import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useInView } from '../hooks/useInView';

const stats = [
  { key: 'stats.experience', value: 15 },
  { key: 'stats.transactions', value: 500 },
  { key: 'stats.clients', value: 350 },
  { key: 'stats.partners', value: 80 },
];

const Counter: React.FC<{ target: number; isVisible: boolean; suffix?: string }> = ({
  target,
  isVisible,
  suffix = '+',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className="text-center"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${i * 0.15}s`,
              }}
            >
              <div className="text-3xl sm:text-5xl font-display font-bold text-gradient-gold mb-2">
                <Counter target={stat.value} isVisible={isInView} />
              </div>
              <p className="text-sm text-muted-foreground font-body tracking-wide uppercase">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
