import { useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { OptionType } from '../types';
import { formatUKPostcode } from '../utils/formatters';

const formatInput = (input: string): string => {
    if (/\d/.test(input)) {
      // Format as UK postcode
      return formatUKPostcode(input);
    }
    // Format with slashes
    return input.toUpperCase().match(/.{1,2}/g)?.join('/') || input;
  };

export const useFetchSuggestions = () => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (/\d/.test(input)) {
      const formattedInput = formatInput(input);
      setOptions([{ value: formattedInput, label: input.toUpperCase() }]);
      return;
    }

    const formattedInput = formatInput(input);
    try {
      if (formattedInput) {
        const response = await axios.get(`http://localhost:3001/typeahead/${encodeURIComponent(formattedInput)}`);
        const suggestions = response.data.typeAheadLocations.map((loc: any) => ({
          value: loc.locationIdentifier,
          label: loc.displayName,
        }));
        setOptions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce((input: string) => fetchSuggestions(input), 1000), []);

  return { options, debouncedFetchSuggestions, setOptions };
};
