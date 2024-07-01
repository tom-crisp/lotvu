import { useState } from "react";
import { PropertyWithMetrics } from "../types";
import { formatCurrency, formatPercentage } from "../utils/formatters";

const PropertyCard = ({ property }: {property: PropertyWithMetrics}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src={property.mainImage} alt={property.summary} className="mb-4 w-full h-48 object-cover rounded" />
        <h3 className="text-xl font-bold mb-2">{property.displayAddress}</h3>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Price</p>
            <p>{property.price}</p>
          </div>
          <div>
            <p className="font-semibold">Annual Income</p>
            <p>{formatCurrency(property.annualIncome)}</p>
          </div>
          <div>
            <p className="font-semibold">Cash on Cash Flow</p>
            <p>{property.cashOnCashFlow}</p>
          </div>
          <div>
            <p className="font-semibold">Loan Amount</p>
            <p>{formatCurrency(property.loanAmount)}</p>
          </div>
          <div>
            <p className="font-semibold">Predicted Yield</p>
            <p>{formatPercentage(property.predictedYield)}</p>
          </div>
          <div>
            <p className="font-semibold">ROI</p>
            <p>{formatPercentage(property.roi)}</p>
          </div>
          <div>
            <p className="font-semibold">Down Payment</p>
            <p>{formatCurrency(property.downPayment)}</p>
          </div>
          <div>
            <p className="font-semibold">Bedrooms</p>
            <p>{property.bedrooms}</p>
          </div>
          <div>
            <p className="font-semibold">Bathrooms</p>
            <p>{property.bathrooms}</p>
          </div>
        </div>
        <p>Contact: {property.contactTelephone} ({property.branchDisplayName})</p>
        <a href={property.propertyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">View Property</a>
        <button
          onClick={() => setIsExpanded(!!isExpanded)}
          className="text-blue-500 mt-2"
        >
          {isExpanded ? 'Hide Description' : 'Show Description'}
        </button>
        {isExpanded && <p className="mt-2">{property.summary}</p>}
      </div>
    );
  };
  

export default PropertyCard;