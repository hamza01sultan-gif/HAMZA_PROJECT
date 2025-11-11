import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import type { SkillItem } from '../../types';
import { Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  isAdmin: boolean;
  data: SkillItem[];
  onUpdate: (data: SkillItem[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ isAdmin, data, onUpdate }) => {
    const handleUpdateItem = (index: number, value: string) => {
        const newData = [...data];
        newData[index].name = value;
        onUpdate(newData);
    };

  return (
    <Section id="skills" title="المهارات" Icon={Sparkles}>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {data.map((skill, index) => (
          <div key={skill.id} className="bg-white px-8 py-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300 border hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10">
            <h3 className="text-xl font-semibold text-slate-700">
                <EditableField isAdmin={isAdmin} value={skill.name} onChange={(e) => handleUpdateItem(index, e.target.value)} inputClassName="text-xl text-center" />
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;