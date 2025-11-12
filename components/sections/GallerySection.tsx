import React, { useState, useEffect } from 'react';
import Section from '../Section';
import type { GalleryItem } from '../../types';
import { Image as ImageIcon, ChevronLeft, ChevronRight, Upload, Trash2, PlusCircle, X } from 'lucide-react';

interface GallerySectionProps {
  isAdmin: boolean;
  data: GalleryItem[];
  onUpdate: (data: GalleryItem[]) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ isAdmin, data, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const openLightbox = (index: number) => {
    // Lightbox is mainly for visitors, so we don't open it in admin mode
    // to avoid interfering with edit controls.
    if (!isAdmin) {
      setLightboxImageIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxImageIndex(null);
  };
  
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

  const goToPreviousLightboxImage = () => {
    if (lightboxImageIndex === null) return;
    const isFirst = lightboxImageIndex === 0;
    setLightboxImageIndex(isFirst ? data.length - 1 : lightboxImageIndex - 1);
  };
  
  const goToNextLightboxImage = () => {
    if (lightboxImageIndex === null) return;
    const isLast = lightboxImageIndex === data.length - 1;
    setLightboxImageIndex(isLast ? 0 : lightboxImageIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImageIndex === null) return;

      if (e.key === 'ArrowRight') {
        goToNextLightboxImage();
      } else if (e.key === 'ArrowLeft') {
        goToPreviousLightboxImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImageIndex, data]);
  
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
        <div 
          onClick={() => openLightbox(currentIndex)} 
          className={`group relative h-96 md:h-[500px] w-full bg-slate-100 rounded-lg shadow-lg overflow-hidden border border-slate-200/80 ${!isAdmin ? 'cursor-pointer' : ''}`}
        >
          <img src={data[currentIndex].src} alt={data[currentIndex].alt} className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105" />
          
          <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/70 rounded-full p-2 hover:bg-white text-slate-800 transition z-10">
            <ChevronLeft size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/70 rounded-full p-2 hover:bg-white text-slate-800 transition z-10">
            <ChevronRight size={28} />
          </button>
          
          {isAdmin && (
            <button onClick={(e) => { e.stopPropagation(); handleRemoveItem(currentIndex); }} className="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition z-10">
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

      {/* Lightbox Modal */}
      {lightboxImageIndex !== null && data[lightboxImageIndex] && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] p-4 animate-fade-in"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="عرض الصورة"
        >
          <button 
            onClick={(e) => {e.stopPropagation(); closeLightbox();}}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-opacity"
            aria-label="إغلاق"
            >
            <X size={32} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); goToPreviousLightboxImage(); }} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
            aria-label="الصورة السابقة"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); goToNextLightboxImage(); }} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
            aria-label="الصورة التالية"
          >
            <ChevronRight size={48} />
          </button>

          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={data[lightboxImageIndex].src}
              alt={data[lightboxImageIndex].alt}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default GallerySection;