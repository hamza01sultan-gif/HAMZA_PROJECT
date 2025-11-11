import React, { useState } from 'react';
import Section from '../Section';
import type { GalleryItem } from '../../types';
import { Image as ImageIcon, ChevronLeft, ChevronRight, Upload, Trash2, PlusCircle } from 'lucide-react';

interface GallerySectionProps {
  isAdmin: boolean;
  data: GalleryItem[];
  onUpdate: (data: GalleryItem[]) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ isAdmin, data, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newItem: GalleryItem = {
            id: `gal${Date.now()}`,
            src: base64String,
            alt: 'صورة جديدة'
        };
        onUpdate([...data, newItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveItem = (index: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
        const newData = data.filter((_, i) => i !== index);
        onUpdate(newData);
        if (currentIndex >= newData.length) {
            setCurrentIndex(Math.max(0, newData.length - 1));
        }
    }
  };

  if (!data || data.length === 0) {
    return (
        <Section id="gallery" title="معرض الصور والشهادات" Icon={ImageIcon}>
            <div className="text-center text-gray-500">
                <p>المعرض فارغ حاليًا.</p>
                {isAdmin && (
                     <div className="mt-6">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            <PlusCircle className="ml-2 h-5 w-5" />
                            إضافة الصورة الأولى
                        </button>
                    </div>
                )}
            </div>
        </Section>
    );
  }

  return (
    <Section id="gallery" title="معرض الصور والشهادات" Icon={ImageIcon}>
      <div className="max-w-4xl mx-auto">
        <div className="group relative h-96 md:h-[500px] w-full bg-slate-100 rounded-lg shadow-lg overflow-hidden border border-slate-200/80">
          <img src={data[currentIndex].src} alt={data[currentIndex].alt} className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105" />
          <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/70 rounded-full p-2 hover:bg-white text-slate-800 transition">
            <ChevronLeft size={28} />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/70 rounded-full p-2 hover:bg-white text-slate-800 transition">
            <ChevronRight size={28} />
          </button>
          {isAdmin && (
            <button onClick={() => handleRemoveItem(currentIndex)} className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition">
              <Trash2 size={20} />
            </button>
          )}
        </div>
        {isAdmin && (
             <div className="text-center mt-6">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                    <Upload className="ml-2 h-5 w-5" />
                    رفع صورة جديدة
                </button>
            </div>
        )}
      </div>
    </Section>
  );
};

export default GallerySection;