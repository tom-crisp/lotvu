import axios from 'axios';
import React, { useState } from 'react';

const PropertyPage: React.FC = () => {
  const [locationIdentifier, setLocationIdentifier] = useState('REGION^274');
  const [maxBedrooms, setMaxBedrooms] = useState(1);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxPrice, setMaxPrice] = useState(475000);
  const [minPrice, setMinPrice] = useState(50000);
  const [radius, setRadius] = useState(15.0);
  const [sortType, setSortType] = useState(2);
  const [propertyTypes, setPropertyTypes] = useState(['detached', 'flat', 'terraced']);
  const [maxDaysSinceAdded, setMaxDaysSinceAdded] = useState(1);
  const [mustHave, setMustHave] = useState(['parking']);
  const [dontShow, setDontShow] = useState(['newHome', 'retirement']);

  const fetchData = async () => {
    const payload = {
      locationIdentifier,
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
    };

    try {
      const response = await axios.post('http://localhost:3001/fetch-properties', payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Rightmove Property Search</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location Identifier:</label>
          <input type="text" value={locationIdentifier} onChange={(e) => setLocationIdentifier(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Max Bedrooms:</label>
          <input type="number" value={maxBedrooms} onChange={(e) => setMaxBedrooms(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Min Bedrooms:</label>
          <input type="number" value={minBedrooms} onChange={(e) => setMinBedrooms(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Max Price:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Min Price:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Radius:</label>
          <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sort Type:</label>
          <input type="number" value={sortType} onChange={(e) => setSortType(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Property Types (comma separated):</label>
          <input type="text" value={propertyTypes.join(',')} onChange={(e) => setPropertyTypes(e.target.value.split(','))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Max Days Since Added:</label>
          <input type="number" value={maxDaysSinceAdded} onChange={(e) => setMaxDaysSinceAdded(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Must Have (comma separated):</label>
          <input type="text" value={mustHave.join(',')} onChange={(e) => setMustHave(e.target.value.split(','))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Don't Show (comma separated):</label>
          <input type="text" value={dontShow.join(',')} onChange={(e) => setDontShow(e.target.value.split(','))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="flex items-center justify-between">
          <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Fetch Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
