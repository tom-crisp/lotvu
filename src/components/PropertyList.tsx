import { PropertyWithMetrics } from "../types";
import PropertyCard from "./PropertyCard";

const PropertiesList = ({ propertiesWithMetrics }: {propertiesWithMetrics: PropertyWithMetrics[]}) => {
    return (
        <>
          {propertiesWithMetrics.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </>
    );
  };

export default PropertiesList;