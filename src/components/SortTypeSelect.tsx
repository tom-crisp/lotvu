import React from 'react';

interface SortTypeSelectProps {
  sortType: number;
  setSortType: (value: number) => void;
}

const SortTypeSelect: React.FC<SortTypeSelectProps> = ({ sortType, setSortType }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Sort Type:</label>
      <select
        value={Number(sortType)}
        onChange={(e) => setSortType(Number(e.target.value))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="2">Highest Price</option>
        <option value="1">Lowest Price</option>
        <option value="10">Oldest Listed</option>
        <option value="6">Newly Listed</option>
      </select>
    </div>
  );
};

export default SortTypeSelect;
