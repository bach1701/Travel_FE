import React from 'react';

interface CustomRadioButtonProps {
  label: string;
  value: string | number;
  checked: boolean;
  onChange: () => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer hidden"
        />
        <div className="w-5 h-5 rounded-full border-2 border-[#FF6A00] flex items-center justify-center transition-all duration-200 peer-checked:border-4">
          <div className="w-2.5 h-2.5 bg-[#FF6A00] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200" />
        </div>
      </div>
      <span className="text-sm" style={{ fontSize: '16px'}}>{label}</span>
    </label>
  );
};

export default CustomRadioButton;
