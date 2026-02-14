import { ROIData, ChartDataPoint, TimeFilter } from '@/types';
import { format, parseISO, subDays, startOfDay, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';

export function prepareTimeSeriesData(
  data: ROIData[],
  timeFilter: TimeFilter,
  valueKey: 'revenue' | 'costs' | 'roi'
): ChartDataPoint[] {
  if (data.length === 0) return [];

  const now = new Date();
  let startDate: Date;
  let groupBy: 'day' | 'week' | 'month' = 'day';

  switch (timeFilter) {
    case '7d':
      startDate = subDays(now, 7);
      groupBy = 'day';
      break;
    case '30d':
      startDate = subDays(now, 30);
      groupBy = 'day';
      break;
    case '90d':
      startDate = subDays(now, 90);
      groupBy = 'week';
      break;
    case '1y':
      startDate = subDays(now, 365);
      groupBy = 'month';
      break;
    case 'all':
      const sortedData = [...data].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
      if (sortedData.length > 0) {
        startDate = parseISO(sortedData[0].date);
        const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > 180) {
          groupBy = 'month';
        } else if (daysDiff > 60) {
          groupBy = 'week';
        } else {
          groupBy = 'day';
        }
      } else {
        startDate = subDays(now, 30);
      }
      break;
    default:
      startDate = subDays(now, 30);
  }

  const filteredData = data.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate >= startDate && entryDate <= now;
  });

  let intervals: Date[];
  if (groupBy === 'day') {
    intervals = eachDayOfInterval({ start: startDate, end: now });
  } else if (groupBy === 'week') {
    intervals = eachWeekOfInterval({ start: startDate, end: now });
  } else {
    intervals = eachMonthOfInterval({ start: startDate, end: now });
  }

  const groupedData = new Map<string, number[]>();

  intervals.forEach(interval => {
    const key = format(interval, groupBy === 'month' ? 'MMM yyyy' : groupBy === 'week' ? 'MMM dd' : 'MMM dd');
    groupedData.set(key, []);
  });

  filteredData.forEach(entry => {
    const entryDate = parseISO(entry.date);
    let key: string;
    
    if (groupBy === 'month') {
      key = format(startOfDay(entryDate), 'MMM yyyy');
    } else if (groupBy === 'week') {
      const weekStart = intervals.find(interval => {
        const weekEnd = new Date(interval);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return entryDate >= interval && entryDate < weekEnd;
      });
      key = weekStart ? format(weekStart, 'MMM dd') : format(entryDate, 'MMM dd');
    } else {
      key = format(entryDate, 'MMM dd');
    }

    const existing = groupedData.get(key) || [];
    
    if (valueKey === 'roi') {
      const roi = entry.revenue - entry.costs;
      existing.push(roi);
    } else {
      existing.push(entry[valueKey]);
    }
    
    groupedData.set(key, existing);
  });

  const chartData: ChartDataPoint[] = [];
  groupedData.forEach((values, date) => {
    const avgValue = values.length > 0 
      ? values.reduce((sum, val) => sum + val, 0) / values.length 
      : 0;
    
    chartData.push({
      date,
      value: Math.round(avgValue * 100) / 100,
      label: date
    });
  });

  return chartData;
}

export function aggregateDataByTool(data: ROIData[]): Array<{
  tool: string;
  totalCosts: number;
  totalRevenue: number;
  roi: number;
  leadsGenerated: number;
}> {
  const toolMap = new Map<string, {
    costs: number;
    revenue: number;
    leads: number;
  }>();

  data.forEach(entry => {
    const existing = toolMap.get(entry.automationTool) || {
      costs: 0,
      revenue: 0,
      leads: 0
    };

    toolMap.set(entry.automationTool, {
      costs: existing.costs + entry.costs,
      revenue: existing.revenue + entry.revenue,
      leads: existing.leads + entry.leadsGenerated
    });
  });

  const result: Array<{
    tool: string;
    totalCosts: number;
    totalRevenue: number;
    roi: number;
    leadsGenerated: number;
  }> = [];

  toolMap.forEach((metrics, tool) => {
    result.push({
      tool,
      totalCosts: metrics.costs,
      totalRevenue: metrics.revenue,
      roi: metrics.revenue - metrics.costs,
      leadsGenerated: metrics.leads
    });
  });

  return result.sort((a, b) => b.roi - a.roi);
}