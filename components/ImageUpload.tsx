import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (base64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const imageToShow = preview || currentImage;

  return (
    <div className="relative group w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center bg-gray-50 overflow-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {imageToShow ? (
        <>
          <img src={imageToShow} alt="Preview" className="w-full h-full object-cover" />
          <div 
            onClick={triggerFileSelect} 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex justify-center items-center cursor-pointer"
          >
            <UploadCloud className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
          </div>
        </>
      ) : (
        <div onClick={triggerFileSelect} className="text-center cursor-pointer text-gray-500">
          <UploadCloud className="w-12 h-12 mx-auto" />
          <p>ارفع صورة جديدة</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
