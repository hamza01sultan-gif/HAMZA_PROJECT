import React, { useRef } from 'react';
import type { LucideProps } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface SectionProps {
  id: string;
  title: string;
  Icon: React.ComponentType<LucideProps>;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, Icon, children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Observe the section, triggering the animation when it's 10% visible.
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`py-16 sm:py-20 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 inline-flex items-center">
          <Icon className="w-8 h-8 ml-3 text-teal-500" />
          {title}
        </h2>
        <div className="mt-3 h-1 w-24 bg-teal-500 mx-auto rounded-full"></div>
      </div>
      {children}
    </section>
  );
};

export default Section;