import axios from 'axios';
import { Property } from '../types';
import { calculateMetrics } from '../utils/metrics';
import { formatPriceString } from '../utils/formatters';
import { setPropertiesWithMetrics, setAverageRent, setAveragePrice } from '../redux/propertySlice';
import { useAppDispatch } from '../redux/hooks';

export const useFetchProperties = () => {
  const dispatch = useAppDispatch();

  const fetchProperties = async (payload: any) => {
    try {
      if (/\d/.test(payload.locationString ?? '')) {
        payload.isPostCode = true;
      } else {
        payload.isPostCode = false;
      }

      const response = await axios.post<any, { data: { properties: Property[], rentals: any[], location: any } }>(
        'http://localhost:3001/fetch-properties', payload
      );

      const salesData = response.data.properties;
      const rentalData = response.data.rentals;
      const rentPrices = rentalData.map(property => property.price.amount);
      const salePrices = salesData.map(property => formatPriceString(property.price));

      const averageRent = rentPrices.reduce((acc, price) => acc + price, 0) / rentPrices.length;
      const averagePrice = salePrices.reduce((acc, price) => acc + price, 0) / salePrices.length;
      dispatch(setAverageRent(averageRent));
      dispatch(setAveragePrice(averagePrice));

      // Remove duplicates based on the property id
      const uniqueProperties = salesData.filter((property, index, self) =>
        index === self.findIndex((p) => p.summary === property.summary)
      );

      const pwm = uniqueProperties.map(property => calculateMetrics(property, averageRent));
      dispatch(setPropertiesWithMetrics(pwm));

    } catch (error) {
      console.error(error);
      return "No Properties were found...";
    }
  };

  return { fetchProperties };
};
