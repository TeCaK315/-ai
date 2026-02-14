export interface ROIData {
  id: string;
  date: string;
  costs: number;
  revenue: number;
  automationTool: string;
  leadsGenerated: number;
  createdAt: string;
}

export interface SalesData {
  date: string;
  revenue: number;
  leadsGenerated: number;
  conversionRate: number;
}

export interface CostData {
  date: string;
  amount: number;
  category: 'automation_tool' | 'training' | 'integration' | 'maintenance';
  description: string;
}

export interface RevenueData {
  date: string;
  amount: number;
  source: string;
}

export interface ROIReport {
  totalROI: number;
  roiPercentage: number;
  paybackPeriod: number;
  totalCosts: number;
  totalRevenue: number;
  netProfit: number;
  costPerAcquisition: number;
  revenueGrowthRate: number;
  period: TimeFilter;
  generatedAt: string;
}

export interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'cost_reduction' | 'revenue_increase' | 'efficiency' | 'automation';
  estimatedImpact: number;
  actionItems: string[];
  implementationDifficulty: 'easy' | 'medium' | 'hard';
}

export type TimeFilter = '7d' | '30d' | '90d' | '1y' | 'all';

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface DashboardFilters {
  timeFilter: TimeFilter;
  automationTool?: string;
  costCategory?: string;
}