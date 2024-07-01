import React, { useState } from "react";
import Select from "react-select";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const sortOptions = [
  { value: "ltv", label: "LTV" },
  { value: "loanAmount", label: "Loan Amount" },
  { value: "downPayment", label: "Down Payment" },
  { value: "annualIncome", label: "Annual Income" },
  { value: "predictedYield", label: "Predicted Yield" },
  { value: "roi", label: "ROI" },
  { value: "cashOnCashFlow", label: "Cash on Cash Flow" },
];

interface SortComponentProps {
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortChange = (option: any) => {
    setSelectedOption(option);
    onSortChange(option.value, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange(selectedOption.value, newOrder);
  };

  return (
    <div className="flex items-center space-x-4">
      <Select
        value={selectedOption}
        onChange={handleSortChange}
        options={sortOptions}
        className="w-64"
      />
      <button onClick={toggleSortOrder} className="text-xl">
        {sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
      </button>
    </div>
  );
};

export default SortComponent;
