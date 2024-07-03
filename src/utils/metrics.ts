import { Property, PropertyWithMetrics } from "../types";

const calculateInvestabilityScore = (predictedYield: string, roi: string, cashOnCashFlow: string) => {
    const yieldScore = parseFloat(predictedYield) || 0;
    const roiScore = parseFloat(roi) || 0;
    const cashFlowScore = parseFloat(cashOnCashFlow) || 0;

    // Normalize the scores to be between 0 and 10
    const maxScore = 10;
    const minScore = 0;

    // Example normalization logic, adjust as needed based on actual data range
    const normalizedYield = Math.min(maxScore, Math.max(minScore, yieldScore / 2));
    const normalizedROI = Math.min(maxScore, Math.max(minScore, roiScore / 2));
    const normalizedCashFlow = Math.min(maxScore, Math.max(minScore, cashFlowScore / 2));

    const averageScore = ((normalizedYield + normalizedROI + normalizedCashFlow) / 3).toFixed(1);
    return averageScore;
  };

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

    const investabilityScore = calculateInvestabilityScore(predictedYield, roi, cashOnCashFlow);

    return {
        ...property,
        ltv: ltv.toFixed(0),
        loanAmount: loanAmount.toFixed(0),
        annualIncome: annualIncome.toFixed(0),
        predictedYield,
        roi,
        cashOnCashFlow,
        downPayment: downPayment.toFixed(0),
        investabilityScore
    }
};

