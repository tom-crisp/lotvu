import { useState } from 'react';
import axios from 'axios';
import { Property, PropertyWithMetrics } from '../types';
import { calculateMetrics } from '../utils/metrics';

export const useFetchProperties = () => {
  const [propertiesWithMetrics, setPropertiesWithMetrics] = useState<PropertyWithMetrics[]>([]);
  const [averageRent, setAverageRent] = useState(0);

  const fetchProperties = async (payload: any) => {
    try {
      if (/\d/.test(payload.locationString ?? '')) {
        payload.isPostCode = true;
      } else {
        payload.isPostCode = false;
      }

      const response = await axios.post<any, { data: { properties: Property[], rentals: any[], location: any } }>(
        'http://localhost:3001/fetch-properties', payload);

      const rentalData = response.data.rentals;
      const rentPrices = rentalData.map(property => property.price.amount);

      const averageRent = rentPrices.reduce((acc, price) => acc + price, 0) / rentPrices.length;
      setAverageRent(averageRent);

      const pwm = response.data.properties.map(property => calculateMetrics(property, averageRent));
      setPropertiesWithMetrics(pwm);

    } catch (error) {
      console.error(error);
      return "No Properties were found..."
    }
  };

  return { propertiesWithMetrics, averageRent, fetchProperties };
};
