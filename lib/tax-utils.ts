/**
 * UK Tax Year utilities
 * Tax year runs from 6th April to 5th April the following year
 */

export interface TaxYear {
  start: Date;
  end: Date;
  year: string; // e.g., "2024-25"
}

/**
 * Get the current UK tax year
 */
export function getCurrentTaxYear(): TaxYear {
  const now = new Date();
  return getTaxYearForDate(now);
}

/**
 * Get the UK tax year for a given date
 */
export function getTaxYearForDate(date: Date): TaxYear {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  
  let taxYearStart: Date;
  let taxYearEnd: Date;
  let taxYearLabel: string;
  
  if (month >= 4) {
    // April onwards - current year to next year
    taxYearStart = new Date(year, 3, 6); // April 6th
    taxYearEnd = new Date(year + 1, 3, 5); // April 5th next year
    taxYearLabel = `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    // January to March - previous year to current year
    taxYearStart = new Date(year - 1, 3, 6); // April 6th previous year
    taxYearEnd = new Date(year, 3, 5); // April 5th current year
    taxYearLabel = `${year - 1}-${year.toString().slice(-2)}`;
  }
  
  return {
    start: taxYearStart,
    end: taxYearEnd,
    year: taxYearLabel
  };
}

/**
 * Get all available tax years (current + previous 4 years)
 */
export function getAvailableTaxYears(): TaxYear[] {
  const current = getCurrentTaxYear();
  const years: TaxYear[] = [current];
  
  // Add previous 4 years
  for (let i = 1; i <= 4; i++) {
    const prevYear = new Date(current.start);
    prevYear.setFullYear(prevYear.getFullYear() - i);
    years.push(getTaxYearForDate(prevYear));
  }
  
  return years;
}

/**
 * Check if a date falls within a tax year
 */
export function isDateInTaxYear(date: Date, taxYear: TaxYear): boolean {
  return date >= taxYear.start && date <= taxYear.end;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Convert from pence to pounds
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Get month name from date
 */
export function getMonthName(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
}

/**
 * Get all months in a tax year
 */
export function getTaxYearMonths(taxYear: TaxYear): Array<{date: Date, name: string}> {
  const months = [];
  const current = new Date(taxYear.start);
  
  while (current <= taxYear.end) {
    months.push({
      date: new Date(current),
      name: getMonthName(current)
    });
    current.setMonth(current.getMonth() + 1);
  }
  
  return months;
}
