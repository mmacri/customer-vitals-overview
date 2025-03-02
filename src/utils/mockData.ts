
import { formatCurrency, formatPercentage, calculatePercentageChange } from './formatters';

export interface Customer {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  contractLength: number;
  mrr: number;
  arr: number;
  signupType: 'SaaS' | 'Enterprise' | 'SMB';
  delta: number;
  country: string;
  state?: string;
}

export interface MetricSummary {
  count: number;
  mrrChange: number;
  mrrValue: number;
  arrValue: number;
  label: string;
  trend: number;
}

export interface DashboardData {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  payingCustomers: {
    count: number;
    trend: number;
  };
  newCustomers: MetricSummary;
  upsellCustomers: MetricSummary;
  downgradeCustomers: MetricSummary;
  churnCustomers: MetricSummary;
  upsells: Customer[];
  downgrades: Customer[];
  arrChangesByMonth: {
    date: Date;
    new: number;
    upsell: number;
    downgrade: number;
    churn: number;
  }[];
  arrByCountry: {
    country: string;
    value: number;
  }[];
  arrByState: {
    state: string;
    value: number;
  }[];
}

// Mock data generator
export const generateMockData = (): DashboardData => {
  // Current date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  // Previous period for trend calculation
  const previousEndDate = new Date(startDate);
  const previousStartDate = new Date(previousEndDate);
  previousStartDate.setDate(previousEndDate.getDate() - 30);

  // Sample countries with weighted probabilities
  const countries = [
    { name: 'United States', weight: 50 },
    { name: 'Canada', weight: 10 },
    { name: 'United Kingdom', weight: 8 },
    { name: 'Germany', weight: 6 },
    { name: 'France', weight: 5 },
    { name: 'Australia', weight: 5 },
    { name: 'Brazil', weight: 4 },
    { name: 'Japan', weight: 4 },
    { name: 'India', weight: 3 },
    { name: 'Other', weight: 5 },
  ];

  // Sample US states with weighted probabilities
  const usStates = [
    { name: 'California', weight: 20 },
    { name: 'New York', weight: 15 },
    { name: 'Texas', weight: 12 },
    { name: 'Florida', weight: 10 },
    { name: 'Illinois', weight: 8 },
    { name: 'Massachusetts', weight: 7 },
    { name: 'Washington', weight: 6 },
    { name: 'Colorado', weight: 5 },
    { name: 'Georgia', weight: 4 },
    { name: 'New Jersey', weight: 4 },
    { name: 'Other', weight: 9 },
  ];

  // Function to select random item based on weights
  const selectWeighted = <T extends { name: string; weight: number }>(items: T[]): string => {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      random -= item.weight;
      if (random <= 0) {
        return item.name;
      }
    }
    
    return items[0].name;
  };

  // Generate mock upsells
  const upsells: Customer[] = Array.from({ length: 44 }, (_, i) => {
    const country = selectWeighted(countries);
    const state = country === 'United States' ? selectWeighted(usStates) : undefined;
    const mrr = Math.floor(Math.random() * 5000) + 500;
    return {
      id: `UP${1000 + i}`,
      name: `Customer ${1000 + i}`,
      startDate: new Date(startDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      contractLength: Math.floor(Math.random() * 24) + 6,
      mrr,
      arr: mrr * 12,
      signupType: ['SaaS', 'Enterprise', 'SMB'][Math.floor(Math.random() * 3)] as 'SaaS' | 'Enterprise' | 'SMB',
      delta: Math.floor(Math.random() * 2000) + 100,
      country,
      state,
    };
  });

  // Generate mock downgrades
  const downgrades: Customer[] = Array.from({ length: 35 }, (_, i) => {
    const country = selectWeighted(countries);
    const state = country === 'United States' ? selectWeighted(usStates) : undefined;
    const mrr = Math.floor(Math.random() * 3000) + 200;
    return {
      id: `DOWN${2000 + i}`,
      name: `Customer ${2000 + i}`,
      startDate: new Date(startDate.getTime() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      contractLength: Math.floor(Math.random() * 12) + 3,
      mrr,
      arr: mrr * 12,
      signupType: ['SaaS', 'Enterprise', 'SMB'][Math.floor(Math.random() * 3)] as 'SaaS' | 'Enterprise' | 'SMB',
      delta: -1 * (Math.floor(Math.random() * 1000) + 100),
      country,
      state,
    };
  });

  // Calculate totals
  const newMRR = 350021.63;
  const newARR = 4200259.56;
  const upsellMRR = 128762.13;
  const upsellARR = 1545145.56;
  const downgradeMRR = 47232.04;
  const downgradeARR = 566784.48;
  const churnMRR = 61207.67;
  const churnARR = 734492.04;

  // Generate ARR changes by month
  const arrChangesByMonth = Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 23 + i);
    return {
      date,
      new: Math.random() * 100000 + 20000,
      upsell: Math.random() * 50000 + 10000,
      downgrade: -1 * (Math.random() * 25000 + 5000),
      churn: -1 * (Math.random() * 30000 + 8000),
    };
  });

  // Generate ARR by country
  const arrByCountry = countries.map(country => ({
    country: country.name,
    value: (country.weight / 100) * (newARR + upsellARR),
  }));

  // Generate ARR by state
  const arrByState = usStates.map(state => ({
    state: state.name,
    value: (state.weight / 100) * (newARR + upsellARR) * 0.6, // Assuming 60% of ARR is from US
  }));

  return {
    dateRange: {
      startDate: new Date(2017, 7, 29), // Aug 29, 2017
      endDate: new Date(2017, 8, 26),   // Sep 26, 2017
    },
    payingCustomers: {
      count: 812,
      trend: 0.3533,
    },
    newCustomers: {
      count: 102,
      mrrChange: 0.3519,
      mrrValue: newMRR,
      arrValue: newARR,
      label: 'New',
      trend: 0.17,
    },
    upsellCustomers: {
      count: 44,
      mrrChange: 0.2270,
      mrrValue: upsellMRR,
      arrValue: upsellARR,
      label: 'Upsell',
      trend: 0.08,
    },
    downgradeCustomers: {
      count: 35,
      mrrChange: -0.0866,
      mrrValue: downgradeMRR,
      arrValue: downgradeARR,
      label: 'Downgrade',
      trend: -0.03,
    },
    churnCustomers: {
      count: 27,
      mrrChange: -0.1993,
      mrrValue: churnMRR,
      arrValue: churnARR,
      label: 'Churn',
      trend: -0.05,
    },
    upsells,
    downgrades,
    arrChangesByMonth,
    arrByCountry,
    arrByState,
  };
};

// Initial mock data
export const mockDashboardData = generateMockData();
