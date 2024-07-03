import React, { createContext, useState, useContext, ReactNode } from 'react';
import { OptionType } from '../types';
import { PropertyWithMetrics } from '../types';

interface PropertyState {
  maxBedrooms: number | null;
  minBedrooms: number | null;
  maxPrice: number | ""; // Updated type
  minPrice: number | ""; // Updated type
  radius: number;
  sortType: number;
  propertyTypes: string[];
  maxDaysSinceAdded: number | null;
  mustHave: string[];
  dontShow: string[];
  inputValue: string;
  selectedOption: OptionType | null;
  isAdvancedOpen: boolean;
  loading: boolean;
  error: string;
  propertiesWithMetrics: PropertyWithMetrics[];
  averageRent: number;
  averagePrice: number;
}

interface PropertyContextProps {
  state: PropertyState;
  setState: React.Dispatch<React.SetStateAction<PropertyState>>;
}

const PropertyContext = createContext<PropertyContextProps | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PropertyState>({
    maxBedrooms: null,
    minBedrooms: null,
    maxPrice: "", // Updated initial value
    minPrice: "", // Updated initial value
    radius: 0,
    sortType: 6,
    propertyTypes: [],
    maxDaysSinceAdded: null,
    mustHave: [],
    dontShow: [],
    inputValue: '',
    selectedOption: null,
    isAdvancedOpen: false,
    loading: false,
    error: '',
    propertiesWithMetrics: [],
    averageRent: 0,
    averagePrice: 0,
  });

  return (
    <PropertyContext.Provider value={{ state, setState }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
