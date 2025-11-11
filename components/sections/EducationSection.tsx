import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import type { EducationData } from '../../types';
import { BookOpen } from 'lucide-react';

interface EducationSectionProps {
  isAdmin: boolean;
  data: EducationData;
  onUpdate: (data: EducationData) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ isAdmin, data, onUpdate }) => {
  const handleChange = (field: keyof EducationData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ ...data, [field]: e.target.value });
  };
  return (
    <Section id="education" title="التعليم" Icon={BookOpen}>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center border border-slate-200/80">
        <h3 className="text-2xl font-bold text-teal-700">
            <EditableField isAdmin={isAdmin} value={data.title} onChange={handleChange('title')} inputClassName="text-2xl text-center" />
        </h3>
        <div className="mt-4 text-slate-600 leading-relaxed">
            <EditableField isAdmin={isAdmin} value={data.description} onChange={handleChange('description')} as="textarea" inputClassName="text-center" />
        </div>
      </div>
    </Section>
  );
};

export default EducationSection;