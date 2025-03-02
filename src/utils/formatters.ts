
/**
 * Format a number as currency (USD)
 * @param value Number to format
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a number as a percentage
 * @param value Number to format (e.g., 0.1234 for 12.34%)
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, maximumFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a number with thousand separators
 * @param value Number to format
 * @returns Formatted number string
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format a date in short format (e.g., "Jan 15, 2023")
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Convert a string to title case
 * @param str String to convert
 * @returns Title case string
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

/**
 * Get the appropriate CSS class for trend indicators
 * @param value A value representing a trend (positive or negative)
 * @returns CSS class for styling
 */
export const getTrendClass = (value: number): string => {
  if (value > 0) return "trend-up";
  if (value < 0) return "trend-down";
  return "";
};

/**
 * Get trend symbol (↑ or ↓) based on value
 * @param value A value representing a trend (positive or negative)
 * @returns Trend symbol
 */
export const getTrendSymbol = (value: number): string => {
  if (value > 0) return "↑";
  if (value < 0) return "↓";
  return "";
};

/**
 * Calculate percentage change
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 1 : 0;
  return (current - previous) / Math.abs(previous);
};
