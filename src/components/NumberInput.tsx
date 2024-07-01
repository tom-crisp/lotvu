import React from 'react';

interface NumberInputProps {
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  step?: number;
  placeholder?: string;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, step = 1, placeholder = "", className = "" }) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder={placeholder}
        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        className={`${className} rounded w-full`}
      />
    </div>
  );
};

export default NumberInput;
