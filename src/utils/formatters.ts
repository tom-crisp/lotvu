export const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(Number(value));
  };
  
export const formatPercentage = (value: string) => {
    return `${value}%`;
  };

export const formatUKPostcode = (input: string): string => {
    const postcode = input.toUpperCase().replace(/\s+/g, '');
    const patterns = [
      /^([A-Z]{1,2})(\d{1,2})(\d[A-Z]{2})$/,
      /^([A-Z]{1,2})(\d[A-Z])(\d[A-Z]{2})$/,
    ];
  
    for (const pattern of patterns) {
      const match = postcode.match(pattern);
      if (match) {
        return `${match[1]}${match[2]}-${match[3]}`;
      }
    }
  
    return postcode;
  };

  export const nonlinearMarks = {
    0: '0',
    500000: '500k',
    1000000: '1M',
    2000000: '2M',
    3000000: '3M',
    4000000: '4M',
    5000000: '5M',
    6000000: '6M'
  };
  
  export const nonlinearScale = (value: number) => {
    if (value < 500000) {
      return value;
    } else {
      return 500000 + (value - 500000) * (5500000 / 550000);
    }
  };
  
  export const reverseNonlinearScale = (value: number) => {
    if (value < 500000) {
      return value;
    } else {
      return 500000 + (value - 500000) * (550000 / 5500000);
    }
  };

  export const formatPriceString = (price: string) => {
    const numberString = price.replace(/[£,]/g, "");
    return parseFloat(numberString);
  }