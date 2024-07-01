import React, { useState, useEffect } from "react";
import { PropertyWithMetrics, SortableKeys } from "../types";
import PropertyCard from "./PropertyCard";
import SortComponent from "./SortComponent";

const PropertiesList = ({ propertiesWithMetrics }: { propertiesWithMetrics: PropertyWithMetrics[] }) => {
  const [sortedProperties, setSortedProperties] = useState(propertiesWithMetrics);

  useEffect(() => {
    setSortedProperties(propertiesWithMetrics);
  }, [propertiesWithMetrics]);

  const handleSortChange = (sortBy: SortableKeys, order: "asc" | "desc") => {
    const sorted = [...propertiesWithMetrics].sort((a, b) => {
      const aValue = parseFloat(a[sortBy].replace('%', ''));
      const bValue = parseFloat(b[sortBy].replace('%', ''));
      
      if (isNaN(aValue) || isNaN(bValue)) {
        return 0;
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortedProperties(sorted);
  };

  return (
    <div className="flex flex-col">
    <div className="self-center my-8">
      <SortComponent onSortChange={handleSortChange} />
    </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProperties.map((property, index) => (
          <PropertyCard key={`${index}-${property.id}`} property={property} />
        ))}
        </div>
    </div>
  );
};

export default PropertiesList;
