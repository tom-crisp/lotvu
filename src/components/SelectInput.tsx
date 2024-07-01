import React from 'react';
import Select from 'react-select';

interface OptionType {
  value: number | null;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  options: OptionType[];
  className?: string;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    borderRadius: '0.5em',
    boxShadow: 'none',
    '&:hover': {
      border: 'none'
    }
  }),
  // Add other style customizations if needed
};

const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options, className = "mb-4" }) => {
  const handleChange = (selectedOption: OptionType | null) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        isClearable
      />
    </div>
  );
};

export default SelectInput;
