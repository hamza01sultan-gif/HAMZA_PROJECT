import React, { useState } from 'react';
import Section from '../Section';
import EditableField from '../EditableField';
import type { TestimonialItem } from '../../types';
import { Quote, ChevronLeft, ChevronRight, PlusCircle, Trash2 } from 'lucide-react';

interface TestimonialsSectionProps {
  isAdmin: boolean;
  data: TestimonialItem[];
  onUpdate: (data: TestimonialItem[]) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isAdmin, data, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const handleUpdateItem = (index: number, field: keyof TestimonialItem, value: string) => {
    const newData = [...data];
    (newData[index] as any)[field] = value;
    onUpdate(newData);
  };

  const handleAddItem = () => {
    const newItem: TestimonialItem = {
      id: `tes${Date.now()}`,
      quote: 'اقتباس جديد هنا...',
      author: 'اسم المؤلف',
      authorTitle: 'وظيفة المؤلف',
    };
    onUpdate([...data, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه التوصية؟')) {
      const newData = data.filter((_, i) => i !== index);
      onUpdate(newData);
      if (currentIndex >= newData.length) {
          setCurrentIndex(Math.max(0, newData.length - 1));
      }
    }
  };

  if (!data || data.length === 0) {
    return (
        <Section id="testimonials" title="قالوا عني" Icon={Quote}>
            <div className="text-center text-gray-500">
                <p>لا توجد توصيات حاليًا.</p>
                {isAdmin && (
                     <div className="mt-6">
                        <button onClick={handleAddItem} className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            <PlusCircle className="ml-2 h-5 w-5" />
                            إضافة التوصية الأولى
                        </button>
                    </div>
                )}
            </div>
        </Section>
    );
  }

  return (
    <Section id="testimonials" title="قالوا عني" Icon={Quote}>
      {isAdmin ? (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {data.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md relative border border-slate-200/80 space-y-3">
                         <button 
                            onClick={() => handleRemoveItem(index)}
                            className="absolute top-3 left-3 bg-red-100 text-red-500 rounded-full p-1.5 hover:bg-red-200 transition-colors"
                            aria-label="حذف التوصية"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div>
                            <label className="text-sm font-medium text-slate-500">الاقتباس</label>
                            <EditableField isAdmin={isAdmin} value={item.quote} onChange={(e) => handleUpdateItem(index, 'quote', e.target.value)} as="textarea" inputClassName="text-slate-700" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">المؤلف</label>
                            <EditableField isAdmin={isAdmin} value={item.author} onChange={(e) => handleUpdateItem(index, 'author', e.target.value)} inputClassName="font-semibold text-slate-800" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">الوظيفة</label>
                            <EditableField isAdmin={isAdmin} value={item.authorTitle} onChange={(e) => handleUpdateItem(index, 'authorTitle', e.target.value)} inputClassName="text-slate-600" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={handleAddItem}
                className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
              >
                <PlusCircle className="ml-2 h-5 w-5" />
                إضافة توصية جديدة
              </button>
            </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-slate-200/80 min-h-[280px] flex flex-col justify-center">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-teal-100 transform -scale-x-100" />
            <p className="text-xl sm:text-2xl italic text-slate-700 leading-relaxed">
              "{data[currentIndex].quote}"
            </p>
            <div className="mt-8">
              <p className="font-bold text-lg text-slate-900">{data[currentIndex].author}</p>
              <p className="text-slate-500">{data[currentIndex].authorTitle}</p>
            </div>
          </div>
          <button onClick={goToPrevious} aria-label="التوصية السابقة" className="absolute top-1/2 -translate-y-1/2 left-4 sm:-left-8 bg-white rounded-full p-2 shadow-md hover:bg-slate-100 text-slate-800 transition">
            <ChevronLeft size={28} />
          </button>
          <button onClick={goToNext} aria-label="التوصية التالية" className="absolute top-1/2 -translate-y-1/2 right-4 sm:-right-8 bg-white rounded-full p-2 shadow-md hover:bg-slate-100 text-slate-800 transition">
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </Section>
  );
};

export default TestimonialsSection;