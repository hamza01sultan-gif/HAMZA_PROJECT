import React from 'react';
import type { LucideProps } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  Icon: React.ComponentType<LucideProps>;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, Icon, children }) => {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 inline-flex items-center">
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
