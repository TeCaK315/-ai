import { ROIData, SalesData, CostData, RevenueData } from '@/types';

const STORAGE_KEYS = {
  ROI_DATA: 'roi_data',
  SALES_DATA: 'sales_data',
  COST_DATA: 'cost_data',
  REVENUE_DATA: 'revenue_data',
} as const;

export function saveROIData(data: ROIData[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ROI_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save ROI data:', error);
  }
}

export function loadROIData(): ROIData[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.ROI_DATA);
    if (!stored) return [];
    return JSON.parse(stored) as ROIData[];
  } catch (error) {
    console.error('Failed to load ROI data:', error);
    return [];
  }
}

export function saveSalesData(data: SalesData[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SALES_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save sales data:', error);
  }
}

export function loadSalesData(): SalesData[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.SALES_DATA);
    if (!stored) return [];
    return JSON.parse(stored) as SalesData[];
  } catch (error) {
    console.error('Failed to load sales data:', error);
    return [];
  }
}

export function saveCostData(data: CostData[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.COST_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save cost data:', error);
  }
}

export function loadCostData(): CostData[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.COST_DATA);
    if (!stored) return [];
    return JSON.parse(stored) as CostData[];
  } catch (error) {
    console.error('Failed to load cost data:', error);
    return [];
  }
}

export function saveRevenueData(data: RevenueData[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.REVENUE_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save revenue data:', error);
  }
}

export function loadRevenueData(): RevenueData[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.REVENUE_DATA);
    if (!stored) return [];
    return JSON.parse(stored) as RevenueData[];
  } catch (error) {
    console.error('Failed to load revenue data:', error);
    return [];
  }
}

export function clearAllData(): void {
  try {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}

export function addROIEntry(entry: Omit<ROIData, 'id' | 'createdAt'>): ROIData {
  const newEntry: ROIData = {
    ...entry,
    id: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  const existingData = loadROIData();
  const updatedData = [...existingData, newEntry];
  saveROIData(updatedData);

  return newEntry;
}