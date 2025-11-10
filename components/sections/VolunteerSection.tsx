import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import type { VolunteerItem } from '../../types';
import { HeartHandshake, PlusCircle, Trash2 } from 'lucide-react';

interface VolunteerSectionProps {
  isAdmin: boolean;
  data: VolunteerItem[];
  onUpdate: (data: VolunteerItem[]) => void;
}

const VolunteerSection: React.FC<VolunteerSectionProps> = ({ isAdmin, data, onUpdate }) => {
    const handleUpdateItem = (index: number, field: keyof VolunteerItem, value: string) => {
        const newData = [...data];
        (newData[index] as any)[field] = value;
        onUpdate(newData);
    };

    const handleAddItem = () => {
        const newItem: VolunteerItem = {
          id: `vol${Date.now()}`,
          title: 'عمل تطوعي جديد',
          description: 'وصف العمل التطوعي الجديد.',
        };
        onUpdate([...data, newItem]);
    };
    
    const handleRemoveItem = (index: number) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العمل التطوعي؟')) {
            const newData = data.filter((_, i) => i !== index);
            onUpdate(newData);
        }
    };
    
  return (
    <Section id="volunteer" title="الأعمال التطوعية" Icon={HeartHandshake}>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {data.map((item, index) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md relative">
            {isAdmin && (
                <button 
                    onClick={() => handleRemoveItem(index)}
                    className="absolute top-3 left-3 bg-red-100 text-red-500 rounded-full p-1.5 hover:bg-red-200 transition-colors"
                    aria-label="حذف العمل التطوعي"
                >
                    <Trash2 size={18} />
                </button>
            )}
            <h3 className="text-xl font-bold text-gray-800">
                <EditableField isAdmin={isAdmin} value={item.title} onChange={(e) => handleUpdateItem(index, 'title', e.target.value)} inputClassName="text-xl" />
            </h3>
            <p className="mt-2 text-gray-600">
                <EditableField isAdmin={isAdmin} value={item.description} onChange={(e) => handleUpdateItem(index, 'description', e.target.value)} as="textarea" />
            </p>
          </div>
        ))}
      </div>
      {isAdmin && (
        <div className="text-center mt-10">
          <button
            onClick={handleAddItem}
            className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
          >
            <PlusCircle className="ml-2 h-5 w-5" />
            إضافة عمل تطوعي
          </button>
        </div>
      )}
    </Section>
  );
};

export default VolunteerSection;
