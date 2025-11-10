import React from 'react';

interface EditableFieldProps {
  isAdmin: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ isAdmin, value, onChange, as = 'input', className, inputClassName, placeholder }) => {
  if (isAdmin) {
    const commonProps = {
      value,
      onChange,
      placeholder,
      className: `w-full p-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${inputClassName}`
    };
    if (as === 'textarea') {
      return <textarea {...commonProps} rows={4} />;
    }
    return <input type="text" {...commonProps} />;
  }

  if (as === 'textarea') {
    return <p className={className}>{value}</p>;
  }
  return <span className={className}>{value}</span>;
};

export default EditableField;
