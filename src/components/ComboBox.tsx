import React from 'react';
import Select, { MultiValue, SingleValue, ActionMeta } from 'react-select';
import { OptionType } from '../types';

interface ComboBoxProps {
  label: string;
  options: OptionType[];
  value: MultiValue<OptionType>;
  onChange: (value: MultiValue<OptionType>) => void;
  isMulti?: boolean;
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, options, value, onChange, isMulti = true, className="" }) => {
  const handleChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (isMulti && Array.isArray(newValue)) {
      onChange(newValue as MultiValue<OptionType>);
    }
  };

  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        isMulti={isMulti}
        classNamePrefix="react-select"
        className="border-none"
      />
    </div>
  );
};

export default ComboBox;
