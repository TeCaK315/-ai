import { ROIData, ROIReport, TimeFilter } from '@/types';
import { differenceInDays, subDays, parseISO } from 'date-fns';

export function calculateROI(costs: number, revenue: number): number {
  if (costs === 0) return 0;
  return revenue - costs;
}

export function calculateROIPercentage(costs: number, revenue: number): number {
  if (costs === 0) return 0;
  return ((revenue - costs) / costs) * 100;
}

export function calculatePaybackPeriod(
  totalCosts: number,
  dailyRevenue: number
): number {
  if (dailyRevenue === 0) return 0;
  return Math.ceil(totalCosts / dailyRevenue);
}

export function calculateCostPerAcquisition(
  totalCosts: number,
  leadsGenerated: number
): number {
  if (leadsGenerated === 0) return 0;
  return totalCosts / leadsGenerated;
}

export function calculateRevenueGrowthRate(
  currentRevenue: number,
  previousRevenue: number
): number {
  if (previousRevenue === 0) return 0;
  return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
}

function filterDataByTimeRange(data: ROIData[], timeFilter: TimeFilter): ROIData[] {
  const now = new Date();
  let startDate: Date;

  switch (timeFilter) {
    case '7d':
      startDate = subDays(now, 7);
      break;
    case '30d':
      startDate = subDays(now, 30);
      break;
    case '90d':
      startDate = subDays(now, 90);
      break;
    case '1y':
      startDate = subDays(now, 365);
      break;
    case 'all':
      return data;
    default:
      startDate = subDays(now, 30);
  }

  return data.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate >= startDate;
  });
}

export function generateROIReport(
  allData: ROIData[],
  timeFilter: TimeFilter = '30d'
): ROIReport {
  const filteredData = filterDataByTimeRange(allData, timeFilter);

  if (filteredData.length === 0) {
    return {
      totalROI: 0,
      roiPercentage: 0,
      paybackPeriod: 0,
      totalCosts: 0,
      totalRevenue: 0,
      netProfit: 0,
      costPerAcquisition: 0,
      revenueGrowthRate: 0,
      period: timeFilter,
      generatedAt: new Date().toISOString(),
    };
  }

  const totalCosts = filteredData.reduce((sum, entry) => sum + entry.costs, 0);
  const totalRevenue = filteredData.reduce((sum, entry) => sum + entry.revenue, 0);
  const totalLeads = filteredData.reduce((sum, entry) => sum + entry.leadsGenerated, 0);

  const sortedData = [...filteredData].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  const midPoint = Math.floor(sortedData.length / 2);
  const firstHalf = sortedData.slice(0, midPoint);
  const secondHalf = sortedData.slice(midPoint);

  const firstHalfRevenue = firstHalf.reduce((sum, entry) => sum + entry.revenue, 0);
  const secondHalfRevenue = secondHalf.reduce((sum, entry) => sum + entry.revenue, 0);

  const daysDiff = sortedData.length > 0
    ? differenceInDays(
        parseISO(sortedData[sortedData.length - 1].date),
        parseISO(sortedData[0].date)
      ) || 1
    : 1;

  const dailyRevenue = totalRevenue / daysDiff;

  return {
    totalROI: calculateROI(totalCosts, totalRevenue),
    roiPercentage: calculateROIPercentage(totalCosts, totalRevenue),
    paybackPeriod: calculatePaybackPeriod(totalCosts, dailyRevenue),
    totalCosts,
    totalRevenue,
    netProfit: totalRevenue - totalCosts,
    costPerAcquisition: calculateCostPerAcquisition(totalCosts, totalLeads),
    revenueGrowthRate: calculateRevenueGrowthRate(secondHalfRevenue, firstHalfRevenue),
    period: timeFilter,
    generatedAt: new Date().toISOString(),
  };
}