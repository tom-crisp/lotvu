import { Property, PropertyWithMetrics } from "../types";

export const calculateMetrics = (property: Property, averageRent: number, ltv: number = 0.75): PropertyWithMetrics => {
    const price = parseFloat(property.price.replace(/[^\d.-]/g, ''));
    const loanAmount = price * ltv;
    const downPayment = price - loanAmount;
    
    // Annual income based on average rent
    const annualIncome = averageRent * 12;
    
    // Predicted yield
    const predictedYield = ((annualIncome / price) * 100).toFixed(2);
    
    // ROI calculation
    const interestRate = 0.03; // Assuming a 3% interest rate
    const roi = (((annualIncome - (loanAmount * interestRate)) / downPayment) * 100).toFixed(2);
    
    // Cash on cash flow calculation
    const cashOnCashFlow = ((annualIncome - (loanAmount * interestRate)) / downPayment).toFixed(2);
    
    return {
        ...property,
        ltv: ltv.toFixed(0),
        loanAmount: loanAmount.toFixed(0),
        annualIncome: annualIncome.toFixed(0),
        predictedYield,
        roi,
        cashOnCashFlow,
        downPayment: downPayment.toFixed(0)
    };
};
