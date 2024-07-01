import React from 'react';
import Select, { MultiValue } from 'react-select';
import { OptionType } from '../types';

interface PropertyFilterProps {
  label: string;
  options: OptionType[];
  selectedOptions: string[];
  handleChange: (selectedOptions: MultiValue<OptionType>) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ label, options, selectedOptions, handleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <Select
        isMulti
        options={options}
        value={options.filter(option => selectedOptions.includes(option.value))}
        onChange={handleChange}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default PropertyFilter;
