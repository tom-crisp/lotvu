import { useState } from "react";
import { PropertyWithMetrics } from "../types";
import { formatCurrency, formatPercentage } from "../utils/formatters";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";

const PropertyCard = ({ property }: { property: PropertyWithMetrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [statIndex, setStatIndex] = useState(0);

  const stats = [
      { label: "Predicted Yield", value: formatPercentage(property.predictedYield) },
      { label: "ROI", value: formatPercentage(property.roi) },
      { label: "Down Payment", value: formatCurrency(property.downPayment) },
      { label: "Loan Amount", value: formatCurrency(property.loanAmount) },
    { label: "Cash on Cash Flow", value: property.cashOnCashFlow },
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
  ];

  const handlePrevStat = () => {
    setStatIndex((prevIndex) => (prevIndex === 0 ? stats.length - 1 : prevIndex - 1));
  };

  const handleNextStat = () => {
    setStatIndex((prevIndex) => (prevIndex === stats.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={property.mainImage} alt={property.summary} className="mb-4 w-full h-48 rounded-lg object-cover" />
      <div className="mb-4 flex justify-between">
        <div>
          <p className="font-semibold">Price</p>
          <p>{property.price}</p>
        </div>
        <div>
          <p className="font-semibold">Annual Income</p>
          <p>{formatCurrency(property.annualIncome)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <FaChevronLeft onClick={handlePrevStat} />
        <div className="text-center">
          <p className="font-semibold text-xl">{stats[statIndex].label}</p>
          <p className="text-2xl">{stats[statIndex].value}</p>
        </div>
        <FaChevronRight onClick={handleNextStat} />
      </div>
      <div className="text-center">
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-2"
        >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && 
      <>
        <h3 className="text-xl t-bold mb-2">{property.displayAddress}</h3>
        <p>Contact: {property.contactTelephone} ({property.branchDisplayName})</p>
        <p className="mt-2">{property.summary}</p>
        <a href={property.propertyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
            Visit
        </a>

      </>
      }
    </div>
  );
};

export default PropertyCard;
