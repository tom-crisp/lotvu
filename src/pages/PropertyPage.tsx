import React, { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { OptionType } from '../types';
import PropertiesList from '../components/PropertyList';
import LocationInput from '../components/LocationInput';
import ComboBox from '../components/ComboBox';
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import { useFetchProperties } from '../hooks/useFetchProperties';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Divider from '../components/Divider';
import Loader from '../components/Loader';

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

const PropertyPage: React.FC = () => {
  const [maxBedrooms, setMaxBedrooms] = useState<number | null>(null);
  const [minBedrooms, setMinBedrooms] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [radius, setRadius] = useState(0);
  const [sortType, setSortType] = useState(6);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [maxDaysSinceAdded, setMaxDaysSinceAdded] = useState<number | null>(null);
  const [mustHave, setMustHave] = useState<string[]>([]);
  const [dontShow, setDontShow] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { propertiesWithMetrics, averageRent, fetchProperties } = useFetchProperties();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePropertyTypeChange = (selectedOptions: MultiValue<OptionType>) => {
    setPropertyTypes(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleMustHaveChange = (selectedOptions: MultiValue<OptionType>) => {
    setMustHave(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleDontShowChange = (selectedOptions: MultiValue<OptionType>) => {
    setDontShow(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleFetchProperties = async () => {
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
      isPostCode: /\d/.test(selectedOption?.label ?? ''),
    };
    setError('');
    setLoading(true);
    const propError = await fetchProperties(payload);
    if(propError) setError(propError);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-800" style={{minWidth: '80%'}} >
      <header className="bg-gray-800 text-white shadow-md sticky top-0 z-10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Lotvu Property Search</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 rounded-t-2xl rounded-b-2xl bg-slate-100">
        <LocationInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="bg-transparent rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectInput
              label="Sort Type"
              value={sortType}
              onChange={(value) => setSortType(value ?? 6)}
              options={[
                { value: 2, label: "Highest Price" },
                { value: 1, label: "Lowest Price" },
                { value: 10, label: "Oldest Listed" },
                { value: 6, label: "Newly Listed" }
              ]}
              className="rounded-lg px-4 py-2"
            />
            <SelectInput
              label="Max Bedrooms"
              value={maxBedrooms}
              onChange={setMaxBedrooms}
              options={[
                { value: null, label: "No maximum" },
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" }
              ]}
              className="rounded-lg px-4 py-2"
            />
            <SelectInput
              label="Min Bedrooms"
              value={minBedrooms}
              onChange={setMinBedrooms}
              options={[
                { value: null, label: "No minimum" },
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" }
              ]}
              className="rounded-lg px-4 py-2"
            />
            <NumberInput
              label="Max Price"
              value={maxPrice}
              onChange={setMaxPrice}
              step={10000}
              placeholder="No Maximum"
              className="rounded-lg px-4 py-2"
            />
            <NumberInput
              label="Min Price"
              value={minPrice}
              onChange={setMinPrice}
              step={10000}
              placeholder="No Minimum"
              className="rounded-lg px-4 py-2"
            />
            <SelectInput
              label="Radius"
              value={radius}
              onChange={(value) => setRadius(value ?? 0)}
              options={[
                { value: 0, label: "0 miles" },
                { value: 0.25, label: "0.25 miles" },
                { value: 0.5, label: "0.5 miles" },
                { value: 1, label: "1 mile" },
                { value: 3, label: "3 miles" },
                { value: 5, label: "5 miles" },
                { value: 10, label: "10 miles" },
                { value: 20, label: "20 miles" },
                { value: 30, label: "30 miles" },
                { value: 40, label: "40 miles" }
              ]}
              className="rounded-lg px-4 py-2 border-none"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="bg-transparent text-gray-500 font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
            >
              {isAdvancedOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
            </button>
          </div>

          {isAdvancedOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <ComboBox
                label="Property Types"
                options={propertyTypeOptions}
                value={propertyTypeOptions.filter(option => propertyTypes.includes(option.value))}
                onChange={handlePropertyTypeChange}
                isMulti={true}
                className="rounded-lg px-4 py-2"
              />
              <SelectInput
                label="Since Added"
                value={maxDaysSinceAdded}
                onChange={(value) => setMaxDaysSinceAdded(value ?? null)}
                options={[
                  { value: null, label: "All Time" },
                  { value: 1, label: "24 Hours" },
                  { value: 3, label: "Last 3 Days" },
                  { value: 7, label: "Last 7 Days" },
                  { value: 14, label: "Last 14 Days" }
                ]}
                className="rounded-lg px-4 py-2"
              />
              <ComboBox
                label="Must Have"
                options={filterOptions}
                value={filterOptions.filter(option => mustHave.includes(option.value))}
                onChange={handleMustHaveChange}
                isMulti={true}
                className="rounded-lg px-4 py-2"
              />
              <ComboBox
                label="Don't Show"
                options={filterOptions}
                value={filterOptions.filter(option => dontShow.includes(option.value))}
                onChange={handleDontShowChange}
                isMulti={true}
                className="rounded-lg px-4 py-2"
              />
            </div>
          )}
          <div className="flex justify-center mt-8">
            <button onClick={handleFetchProperties} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Fetch Properties
            </button>
          </div>
          <div className="m-12">
          {loading && <Loader />}
          </div>
        </div>
        <div className="text-center rounded-lg p-8 mb-16 w-full">
          {
              averageRent > 0 ? 
                <h2 className="text-2xl font-bold mb-4">Predicted Rental Income: £{Math.floor(averageRent)}, Total Properties: {propertiesWithMetrics.length}</h2>
                : error ? <h1 className="text-3xl font-bold mb-4 md:mb-0">{error}</h1> : <></>
          }
        </div>
                <PropertiesList propertiesWithMetrics={propertiesWithMetrics} /> 
      </main>
    </div>
  );
};

export default PropertyPage;
