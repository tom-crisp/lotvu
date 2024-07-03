import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionType, PropertyWithMetrics } from '../types';
import { RootState } from './store';

interface PropertyState {
  maxBedrooms: number | null;
  minBedrooms: number | null;
  maxPrice: number | "";
  minPrice: number | "";
  radius: number;
  sortType: number;
  propertyTypes: string[];
  maxDaysSinceAdded: number | null;
  mustHave: string[];
  dontShow: string[];
  inputValue: string;
  selectedOption: OptionType | null;
  isAdvancedOpen: boolean;
  propertiesWithMetrics: PropertyWithMetrics[];
  averageRent: number;
  averagePrice: number;
  loading: boolean;
  error: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: PropertyState = {
  maxBedrooms: null,
  minBedrooms: null,
  maxPrice: "",
  minPrice: "",
  radius: 0,
  sortType: 6,
  propertyTypes: [],
  maxDaysSinceAdded: null,
  mustHave: [],
  dontShow: [],
  inputValue: '',
  selectedOption: null,
  isAdvancedOpen: false,
  propertiesWithMetrics: [],
  averageRent: 0,
  averagePrice: 0,
  loading: false,
  error: '',
  sortBy: "investabilityScore",
  sortOrder: "asc",
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setMaxBedrooms: (state, action: PayloadAction<number | null>) => {
      state.maxBedrooms = action.payload;
    },
    setMinBedrooms: (state, action: PayloadAction<number | null>) => {
      state.minBedrooms = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | "">) => {
      state.maxPrice = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | "">) => {
      state.minPrice = action.payload;
    },
    setRadius: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
    setSortType: (state, action: PayloadAction<number>) => {
      state.sortType = action.payload;
    },
    setPropertyTypes: (state, action: PayloadAction<string[]>) => {
      state.propertyTypes = action.payload;
    },
    setMaxDaysSinceAdded: (state, action: PayloadAction<number | null>) => {
      state.maxDaysSinceAdded = action.payload;
    },
    setMustHave: (state, action: PayloadAction<string[]>) => {
      state.mustHave = action.payload;
    },
    setDontShow: (state, action: PayloadAction<string[]>) => {
      state.dontShow = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setSelectedOption: (state, action: PayloadAction<OptionType | null>) => {
      state.selectedOption = action.payload;
    },
    setIsAdvancedOpen: (state, action: PayloadAction<boolean>) => {
      state.isAdvancedOpen = action.payload;
    },
    setPropertiesWithMetrics: (state, action: PayloadAction<PropertyWithMetrics[]>) => {
      state.propertiesWithMetrics = action.payload;
    },
    setAverageRent: (state, action: PayloadAction<number>) => {
      state.averageRent = action.payload;
    },
    setAveragePrice: (state, action: PayloadAction<number>) => {
      state.averagePrice = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setMaxBedrooms,
  setMinBedrooms,
  setMaxPrice,
  setMinPrice,
  setRadius,
  setSortType,
  setPropertyTypes,
  setMaxDaysSinceAdded,
  setMustHave,
  setDontShow,
  setInputValue,
  setSelectedOption,
  setIsAdvancedOpen,
  setPropertiesWithMetrics,
  setAverageRent,
  setAveragePrice,
  setLoading,
  setError,
  setSortBy,
  setSortOrder,
} = propertySlice.actions;

export const selectPropertyState = (state: RootState) => state.property;

export default propertySlice.reducer;
