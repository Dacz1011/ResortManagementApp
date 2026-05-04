import { useMemo } from 'react';

/**
 * Custom hook to calculate investment metrics for a property.
 *
 * @param {number} ytdIncome - Year-to-date income
 * @param {number} ytdExpenses - Year-to-date expenses
 * @param {number} marketValue - Current market value of the property
 * @param {number} currentMonthIndex - Current month (1-12) for projections
 * @returns {Object} Calculated metrics
 */
export const useInvestmentMetrics = (ytdIncome, ytdExpenses, marketValue, currentMonthIndex) => {
  return useMemo(() => {
    // Avoid division by zero
    const months = currentMonthIndex || 1;
    const value = marketValue || 1;

    // Projections
    const projectedAnnualIncome = (ytdIncome / months) * 12;
    const projectedAnnualExpenses = (ytdExpenses / months) * 12;
    const projectedNOI = projectedAnnualIncome - projectedAnnualExpenses;

    // Metrics
    const capRate = ((projectedNOI / value) * 100).toFixed(2);
    const yieldRate = ((projectedAnnualIncome / value) * 100).toFixed(2);

    return {
      projectedNOI: Math.round(projectedNOI),
      capRate: parseFloat(capRate),
      yield: parseFloat(yieldRate),
      projectedAnnualIncome: Math.round(projectedAnnualIncome),
      projectedAnnualExpenses: Math.round(projectedAnnualExpenses),
    };
  }, [ytdIncome, ytdExpenses, marketValue, currentMonthIndex]);
};
