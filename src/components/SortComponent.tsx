import React from "react";
import Select from "react-select";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { SortableKeys } from "../types";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSortBy, setSortOrder, selectPropertyState } from '../redux/propertySlice';

const sortOptions = [
  { value: "investabilityScore", label: "Invest Score"},
  { value: "ltv", label: "LTV" },
  { value: "loanAmount", label: "Loan Amount" },
  { value: "downPayment", label: "Down Payment" },
  { value: "predictedYield", label: "Predicted Yield" },
  { value: "roi", label: "ROI" },
  { value: "cashOnCashFlow", label: "Cash on Cash Flow" },
];

interface SortComponentProps {
  onSortChange: (sortBy: SortableKeys, order: "asc" | "desc") => void;
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

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector(selectPropertyState);

  const handleSortChange = (option: any) => {
    dispatch(setSortBy(option.value));
    onSortChange(option.value as SortableKeys, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortOrder(newOrder));
    onSortChange(sortBy as SortableKeys, newOrder);
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Sort:</label>
      <Select
        value={sortOptions.find(option => option.value === sortBy)}
        onChange={handleSortChange}
        options={sortOptions}
        className="w-64"
        styles={customStyles}
      />
      <button onClick={toggleSortOrder} className="text-xl">
        {sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
      </button>
    </div>
  );
};

export default SortComponent;
