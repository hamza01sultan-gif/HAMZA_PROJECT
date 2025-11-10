import React from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import type { JourneyItem } from '../../types';
import { Footprints, PlusCircle, Trash2 } from 'lucide-react';

interface JourneySectionProps {
  isAdmin: boolean;
  data: JourneyItem[];
  onUpdate: (data: JourneyItem[]) => void;
}

const JourneySection: React.FC<JourneySectionProps> = ({ isAdmin, data, onUpdate }) => {
  const handleUpdateItem = (index: number, field: keyof JourneyItem, value: string) => {
    const newData = [...data];
    (newData[index] as any)[field] = value;
    onUpdate(newData);
  };
  
  const handleAddItem = () => {
    const newItem: JourneyItem = {
      id: `jrn${Date.now()}`,
      semester: 'فصل دراسي جديد',
      summary: 'ملخص التطور والإنجازات في هذا الفصل.',
    };
    onUpdate([...data, newItem]);
  };
  
  const handleRemoveItem = (index: number) => {
      if (window.confirm('هل أنت متأكد من حذف هذه المرحلة؟')) {
          const newData = data.filter((_, i) => i !== index);
          onUpdate(newData);
      }
  };

  return (
    <Section id="journey" title="رحلتي" Icon={Footprints}>
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 h-full w-0.5 bg-teal-200 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {data.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="md:flex items-center md:space-x-8">
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg relative">
                    {isAdmin && (
                        <button 
                            onClick={() => handleRemoveItem(index)}
                            className="absolute top-3 left-3 bg-red-100 text-red-500 rounded-full p-1.5 hover:bg-red-200 transition-colors"
                            aria-label="حذف المرحلة"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                    <h3 className="text-xl font-bold text-teal-600">
                        <EditableField isAdmin={isAdmin} value={item.semester} onChange={(e) => handleUpdateItem(index, 'semester', e.target.value)} inputClassName="text-xl"/>
                    </h3>
                    <p className="mt-2 text-gray-600">
                        <EditableField isAdmin={isAdmin} value={item.summary} onChange={(e) => handleUpdateItem(index, 'summary', e.target.value)} as="textarea"/>
                    </p>
                  </div>
                </div>
              </div>
              {/* Timeline Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <div className="text-center mt-12">
          <button
            onClick={handleAddItem}
            className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
          >
            <PlusCircle className="ml-2 h-5 w-5" />
            إضافة مرحلة جديدة
          </button>
        </div>
      )}
    </Section>
  );
};

export default JourneySection;
