import React from 'react';
import { useInView } from '../hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const getTransform = () => {
    if (isInView) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'left': return 'translate3d(-40px, 0, 0)';
      case 'right': return 'translate3d(40px, 0, 0)';
      case 'fade': return 'translate3d(0, 0, 0)';
      default: return 'translate3d(0, 40px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
