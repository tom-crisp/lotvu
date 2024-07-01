import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { Property, PropertyWithMetrics } from '../types';
import PropertiesList from '../components/PropertyList';
import { calculateMetrics } from '../utils/metrics';

interface OptionType {
  value: string;
  label: string;
}

const PropertyPage: React.FC = () => {
  const [maxBedrooms, setMaxBedrooms] = useState<number | null>(null);
  const [isPostCode, setIsPostCode] = useState<boolean>(false);
  const [minBedrooms, setMinBedrooms] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [radius, setRadius] = useState(0);
  const [sortType, setSortType] = useState(6);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [maxDaysSinceAdded, setMaxDaysSinceAdded] = useState<number | null>(null);
  const [mustHave, setMustHave] = useState<string[]>([]);
  const [dontShow, setDontShow] = useState<string[]>([]);
  const [propertiesWithMetrics, setPropertiesWithMetrics] = useState<PropertyWithMetrics[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);
  const locationRef = useRef<any>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [averageRent, setAverageRent] = useState(0);

  const formatUKPostcode = (input: string): string => {
    const postcode = input.toUpperCase().replace(/\s+/g, '');
    const patterns = [
      /^([A-Z]{1,2})(\d{1,2})(\d[A-Z]{2})$/, // Patterns: A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
      /^([A-Z]{1,2})(\d[A-Z])(\d[A-Z]{2})$/ // Patterns: A9A 9AA, AA9A 9AA
    ];

    for (const pattern of patterns) {
      const match = postcode.match(pattern);
      if (match) {
        return `${match[1]}${match[2]}-${match[3]}`;
      }
    }

    return postcode;
  };


  const propertyTypeOptions = [
    { value: 'detached', label: 'Detached' },
    { value: 'semi-detached', label: 'Semi-Detached' },
    { value: 'terraced', label: 'Terraced' },
    { value: 'flat', label: 'Flat' },
    { value: 'bungalow', label: 'Bungalow' },
    { value: 'land', label: 'Land' },
    { value: 'park-home', label: 'Park-Home' }
  ];

  const filterOptions = [
    { value: 'auction', label: 'Auction Property' },
    { value: 'sharedOwnership', label: 'Shared Ownership' },
    { value: 'retirement', label: 'Retirement Home' },
    { value: 'newHome', label: 'New Home' },
    { value: 'parking', label: 'Parking' },
    { value: 'garden', label: 'Garden' },
    { value: 'park-home', label: 'Park-Home' }
  ];


  const handlePropertyTypeChange = (selectedOptions: MultiValue<{ value: string, label: string }>) => {
    setPropertyTypes(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleMustHaveChange = (selectedOptions: MultiValue<{ value: string, label: string }>) => {
    setMustHave(filterOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleDontShowChange = (selectedOptions: MultiValue<{ value: string, label: string }>) => {
    setDontShow(filterOptions ? selectedOptions.map(option => option.value) : []);
  };


  const fetchProperties = async () => {
    const payload = {
      locationIdentifier: selectedOption?.value,
      locationString: selectedOption?.label.split(/\s+/).join(''),
      maxBedrooms,
      minBedrooms,
      maxPrice,
      minPrice,
      radius,
      sortType,
      propertyTypes,
      maxDaysSinceAdded,
      mustHave,
      dontShow,
      isPostCode,
    };

    try {
      if (/\d/.test(selectedOption?.label ?? '')) {
        setIsPostCode(true);
      } else {
        setIsPostCode(false);
      }
      const response = await axios.post<any, {data: {properties: Property[], rentals: any[], location: any}}>('http://localhost:3001/fetch-properties', payload);
      const rentalData = response.data.rentals;
      const rentPrices = rentalData.map(property => property.price.amount);

      
      // Calculate average rent
      const averageRent = rentPrices.reduce((acc, price) => acc + price, 0) / rentPrices.length;
      setAverageRent(averageRent);

      const pwm = response.data.properties.map(property => calculateMetrics(property, averageRent))

      setPropertiesWithMetrics(pwm);


    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
    if (selected) {
      setInputValue(selected.label);
    } else {
      setInputValue('');
    }
    if(locationRef.current) {
      locationRef.current.blur();
    }
  };
  const handleInputChange = (input: string) => {
    setInputValue(input);
    debouncedFetchSuggestions(input);
  };
  const formatInput = (input: string): string => {
    if (/\d/.test(input)) {
      // Format as UK postcode
      return formatUKPostcode(input);
    }
    // Format with slashes
    return input.toUpperCase().match(/.{1,2}/g)?.join('/') || input;
  };
  const fetchSuggestions = async (input: string) => {
    if (/\d/.test(input)) {
      // If input contains numbers, treat it as a UK postcode
      const formattedInput = formatInput(input);
      setOptions([{ value: formattedInput, label: input.toUpperCase() }]);
      return;
    }

    const formattedInput = formatInput(input);

    try {
      if(formattedInput) {
        const response = await axios.get(`http://localhost:3001/typeahead/${encodeURIComponent(formattedInput)}`);
        const suggestions = response.data.typeAheadLocations.map((loc: any) => ({
          value: loc.locationIdentifier,
          label: loc.displayName,
        }));
        setOptions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const debouncedFetchSuggestions = useCallback(debounce((input: string) => fetchSuggestions(input), 1000), []);

  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Rightmove Property Search</h1>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
      <Select
        ref={locationRef}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Type a location..."
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: 'gray',
            '&:hover': { borderColor: 'black' },
            boxShadow: 'none',
          }),
        }}
        isClearable
      />
    </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sort Type:</label>
            <select
              value={Number(sortType)}
              defaultValue={6}
              onChange={(e) => setSortType(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="2">Highest Price</option>
              <option value="1">Lowest Price</option>
              <option value="10">Oldest Listed</option>
              <option value="6">Newly Listed</option>
            </select>
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Max Bedrooms:</label>
            <select
              value={Number(maxBedrooms)}
              onChange={(e) => setMaxBedrooms(e.target.value ? Number(e.target.value) : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">No maximum</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Min Bedrooms:</label>
            <select
              value={Number(minBedrooms)}
              onChange={(e) => setMinBedrooms(e.target.value ? Number(e.target.value) : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">No minimum</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Max Price:</label>
      <input
        type="number"
        step={10000}
        placeholder="No Maximum"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Min Price:</label>
      <input
        type="number"
        step={10000}
        placeholder="No Minimum"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Radius:</label>
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0}>0 miles</option>
              <option value={0.25}>0.25 miles</option>
              <option value={0.5}>0.5 miles</option>
              <option value={1}>1 mile</option>
              <option value={3}>3 miles</option>
              <option value={5}>5 miles</option>
              <option value={10}>10 miles</option>
              <option value={20}>20 miles</option>
              <option value={30}>30 miles</option>
              <option value={40}>40 miles</option>
            </select>
          </div>
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Property Types:</label>
      <Select
        isMulti
        options={propertyTypeOptions}
        value={propertyTypeOptions.filter(option => propertyTypes.includes(option.value))}
        onChange={handlePropertyTypeChange}
        // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        classNamePrefix="react-select"
      />
    </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Since Added:</label>
            <select
              value={Number(maxDaysSinceAdded)}
              onChange={(e) => setMaxDaysSinceAdded(e.target.value ? Number(e.target.value) : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">All Time</option>
              <option value="1">24 Hours</option>
              <option value="3">Last 3 Days</option>
              <option value="7">Last 7 Days</option>
              <option value="14">Last 14 Days</option>
            </select>
          </div>

          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Must Have:</label>
      <Select
        isMulti
        options={filterOptions}
        value={filterOptions.filter(option => mustHave.includes(option.value))}
        onChange={handleMustHaveChange}
        classNamePrefix="react-select"
      />
    </div>
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Don't Show:</label>
      <Select
        isMulti
        options={filterOptions}
        value={filterOptions.filter(option => dontShow.includes(option.value))}
        onChange={handleDontShowChange}
        classNamePrefix="react-select"
      />
    </div>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={fetchProperties} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Fetch Properties
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Predicted Rental Income: £{Math.floor(averageRent)}</h2>

      <PropertiesList propertiesWithMetrics={propertiesWithMetrics} />

    </div>
  );
};

export default PropertyPage;
