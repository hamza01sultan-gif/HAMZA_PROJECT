import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import ImageUpload from '../ImageUpload';
import type { AboutData } from '../../types';
import { User } from 'lucide-react';

interface AboutSectionProps {
  isAdmin: boolean;
  data: AboutData;
  onUpdate: (data: AboutData) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ isAdmin, data, onUpdate }) => {
  const handleChange = (field: keyof AboutData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ ...data, [field]: e.target.value });
  };
  
  const handleImageChange = (base64: string) => {
    onUpdate({ ...data, profileImage: base64 });
  };

  return (
    <Section id="about" title="نبذة عني" Icon={User}>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
             <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full transform -rotate-12"></div>
              {isAdmin ? (
                 <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <ImageUpload currentImage={data.profileImage} onImageChange={handleImageChange} />
                 </div>
              ) : (
                <img 
                    src={data.profileImage} 
                    alt={data.name} 
                    className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl"
                />
              )}
          </div>
        </div>
        <div className="w-full md:w-2/3 text-center md:text-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            <EditableField 
                isAdmin={isAdmin}
                value={data.name}
                onChange={handleChange('name')}
                inputClassName="text-4xl sm:text-5xl font-bold text-center md:text-right"
            />
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            <EditableField 
                isAdmin={isAdmin}
                value={data.grade}
                onChange={handleChange('grade')}
            /> | <EditableField 
                isAdmin={isAdmin}
                value={data.school}
                onChange={handleChange('school')}
            />
          </p>
          <div className="mt-6 text-lg text-slate-700 leading-relaxed">
            <EditableField
                isAdmin={isAdmin}
                value={data.bio}
                onChange={handleChange('bio')}
                as="textarea"
                inputClassName="text-lg text-center md:text-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;