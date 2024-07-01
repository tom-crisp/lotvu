export interface Property {
    id: number;
    bedrooms: number;
    bathrooms: number;
    summary: string;
    displayAddress: string;
    latitude: number;
    longitude: number;
    propertySubType: string;
    price: string;
    images: string[];
    mainImage: string;
    contactTelephone: string;
    branchDisplayName: string;
    propertyUrl: string;
  }


export interface PropertyWithMetrics extends Property {
  ltv: string;
  loanAmount: string;
  downPayment: string;
  annualIncome: string;
  predictedYield: string;
  roi: string;
  cashOnCashFlow: string;
}

export interface OptionType {
  value: string;
  label: string;
}
