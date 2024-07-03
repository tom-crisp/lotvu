import { useState } from "react";
import { PropertyWithMetrics } from "../types";
import { formatCurrency, formatPercentage } from "../utils/formatters";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const PropertyCard = ({ property }: { property: PropertyWithMetrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { label: "Predicted Yield", value: formatPercentage(property.predictedYield) },
    { label: "ROI", value: formatPercentage(property.roi) },
    { label: "Down Payment", value: formatCurrency(property.downPayment) },
    { label: "Loan Amount", value: formatCurrency(property.loanAmount) },
    { label: "Cash on Cash Flow", value: property.cashOnCashFlow },
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
  ];

  // Calculate the investability score with a maximum of 10 and a minimum of 0
  const calculateInvestabilityScore = () => {
    const yieldScore = parseFloat(property.predictedYield) || 0;
    const roiScore = parseFloat(property.roi) || 0;
    const cashFlowScore = parseFloat(property.cashOnCashFlow) || 0;

    // Normalize the scores to be between 0 and 10
    const maxScore = 10;
    const minScore = 0;

    // Example normalization logic, adjust as needed based on actual data range
    const normalizedYield = Math.min(maxScore, Math.max(minScore, yieldScore / 2));
    const normalizedROI = Math.min(maxScore, Math.max(minScore, roiScore / 2));
    const normalizedCashFlow = Math.min(maxScore, Math.max(minScore, cashFlowScore / 2));

    const averageScore = ((normalizedYield + normalizedROI + normalizedCashFlow) / 3).toFixed(1);
    return averageScore;
  };

  const investabilityScore = calculateInvestabilityScore();

  // Navigate to property details page
  const handleAnalyzeProperty = () => {
    navigate(`/property-details/${property.id}`);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row">
      {/* Investability Score */}
      <Tooltip
        placement="top"
        overlay={
          <span>Investability Score: This score represents the overall investability of the property based on predicted yield, ROI, and cash flow metrics. A score of 10 indicates a very good investment, while a score of 0 indicates a very poor investment.</span>
        }
      >
        <div className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full text-lg font-bold cursor-pointer">
          {investabilityScore}
        </div>
      </Tooltip>

      <div className="lg:w-1/2">
        <img src={property.mainImage} alt={property.summary} className="mb-4 w-full h-48 lg:h-full rounded-lg object-cover" />
      </div>
      <div className="lg:w-1/2 lg:pl-4 flex flex-col justify-between">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-2xl text-gray-800">{property.displayAddress}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center border p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-sm text-gray-700">{stat.label}</p>
                <p className="text-xl text-gray-900">{stat.value}</p>
              </div>
            ))}
            <div className="text-center border p-4 rounded-lg shadow-sm flex flex-col justify-center">
              <button
                onClick={handleAnalyzeProperty}
                className="text-blue-500 mt-2 flex items-center justify-center"
              >
                Analyze Property
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-2 flex items-center justify-center"
          >
            {isExpanded ? (
              <>
                <FaChevronUp className="mr-1" /> Show Less
              </>
            ) : (
              <>
                <FaChevronDown className="mr-1" /> Show More
              </>
            )}
          </button>
        </div>
        {isExpanded && 
        <div className="mt-4">
          <p className="text-gray-700 mb-2">Contact: <span className="font-medium">{property.contactTelephone} ({property.branchDisplayName})</span></p>
          <p className="text-gray-600 mb-2">{property.summary}</p>
          <a href={property.propertyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
            Visit Property
          </a>
        </div>
        }
        <div className="mt-4 text-center">
          <p className="font-bold text-2xl text-gray-800">{property.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
