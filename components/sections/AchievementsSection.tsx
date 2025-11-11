import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import ImageUpload from '../ImageUpload';
import type { AchievementItem } from '../../types';
import { Award, PlusCircle, Trash2 } from 'lucide-react';

interface AchievementsSectionProps {
  isAdmin: boolean;
  data: AchievementItem[];
  onUpdate: (data: AchievementItem[]) => void;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ isAdmin, data, onUpdate }) => {

  const handleUpdateItem = (index: number, field: keyof AchievementItem, value: string) => {
    const newData = [...data];
    (newData[index] as any)[field] = value;
    onUpdate(newData);
  };
  
  const handleImageChange = (index: number, base64: string) => {
    const newData = [...data];
    newData[index].image = base64;
    onUpdate(newData);
  };

  const handleAddItem = () => {
    const newItem: AchievementItem = {
      id: `ach${Date.now()}`,
      title: 'إنجاز جديد',
      description: 'وصف الإنجاز الجديد.',
      image: 'https://picsum.photos/seed/new/600/400',
    };
    onUpdate([...data, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإنجاز؟')) {
        const newData = data.filter((_, i) => i !== index);
        onUpdate(newData);
    }
  };

  return (
    <Section id="achievements" title="الإنجازات الأكاديمية" Icon={Award}>
      <div className="space-y-12">
        {data.map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8 relative border border-slate-200/80">
            {isAdmin && (
              <button 
                onClick={() => handleRemoveItem(index)}
                className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                aria-label="حذف الإنجاز"
                >
                <Trash2 size={20} />
              </button>
            )}
            <div className="w-full md:w-1/2">
                {isAdmin ? (
                    <ImageUpload currentImage={item.image} onImageChange={(base64) => handleImageChange(index, base64)} />
                ) : (
                    <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-md" />
                )}
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-slate-800">
                <EditableField isAdmin={isAdmin} value={item.title} onChange={(e) => handleUpdateItem(index, 'title', e.target.value)} inputClassName="text-2xl"/>
              </h3>
              <p className="mt-2 text-slate-600">
                <EditableField isAdmin={isAdmin} value={item.description} onChange={(e) => handleUpdateItem(index, 'description', e.target.value)} as="textarea" />
              </p>
            </div>
          </div>
        ))}
         {isAdmin && (
          <div className="text-center">
            <button
              onClick={handleAddItem}
              className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
            >
              <PlusCircle className="ml-2 h-5 w-5" />
              إضافة إنجاز جديد
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default AchievementsSection;