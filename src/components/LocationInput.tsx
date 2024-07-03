import React, { useRef } from 'react';
import Select, { SingleValue } from 'react-select';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';
import { OptionType } from '../types';
import { FiSearch } from 'react-icons/fi';

interface LocationInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedOption: SingleValue<OptionType>;
  setSelectedOption: (option: SingleValue<OptionType>) => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2.5rem', // Space for the icon
    borderRadius: '9999px', // Full rounding for a pill shape
    minWidth: '18rem',
    height: '48px', // Adjust height as needed
    backgroundColor: 'white', // White background for the input
    paddingRight: '1rem',
  }),
  input: (provided: any) => ({
    ...provided,
    marginLeft: '1rem',
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: 0,
    paddingRight: '3rem'
  }),
  placeholder: (provided: any) => ({
    ...provided,
    marginLeft: '1rem',
  }),
};

const LocationInput: React.FC<LocationInputProps> = ({ 
  inputValue, 
  setInputValue, 
  selectedOption, 
  setSelectedOption 
}) => {
  const { options, debouncedFetchSuggestions } = useFetchSuggestions();
  const ref = useRef<any>();

  const handleInputChange = (input: string) => {
    setInputValue(input);
    debouncedFetchSuggestions(input);
  };

  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
    if (selected) {
      setInputValue(selected.label);
    } else {
      setInputValue('');
    }
    if(ref.current) {
        ref.current.blur();
    }
  };

  return (
    <div className="relative mb-4 ">
      <div className="flex justify-center items-center">
        <div className="relative items-center pointer-events-none left-8">
          <FiSearch className="text-gray-400 left-35" />
        </div>
        <Select
          ref={ref}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Type a location..."
          styles={customStyles}
          isClearable
          className="w-1/2 pl-10 rounded-full shadow-sm border-gray-300 "
        />
      </div>
    </div>
  );
};

export default LocationInput;
