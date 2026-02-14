import { NextRequest, NextResponse } from 'next/server';
import { ROIReport, TimeFilter } from '@/types';
import {
  calculateROI,
  calculateROIPercentage,
  calculatePaybackPeriod,
  calculateCostPerAcquisition,
} from '@/lib/roi-calculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { costs, revenue, period, leadsGenerated } = body;

    if (typeof costs !== 'number' || typeof revenue !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input: costs and revenue must be numbers' },
        { status: 400 }
      );
    }

    if (costs < 0 || revenue < 0) {
      return NextResponse.json(
        { error: 'Invalid input: costs and revenue must be non-negative' },
        { status: 400 }
      );
    }

    const validPeriods: TimeFilter[] = ['7d', '30d', '90d', '1y', 'all'];
    const timeFilter: TimeFilter = validPeriods.includes(period) ? period : '30d';

    const totalROI = calculateROI(costs, revenue);
    const roiPercentage = calculateROIPercentage(costs, revenue);
    const paybackPeriod = calculatePaybackPeriod(costs, revenue, timeFilter);
    const netProfit = revenue - costs;
    const costPerAcquisition =
      typeof leadsGenerated === 'number' && leadsGenerated > 0
        ? calculateCostPerAcquisition(costs, leadsGenerated)
        : 0;

    const revenueGrowthRate = roiPercentage > 0 ? roiPercentage / 100 : 0;

    const report: ROIReport = {
      totalROI,
      roiPercentage,
      paybackPeriod,
      totalCosts: costs,
      totalRevenue: revenue,
      netProfit,
      costPerAcquisition,
      revenueGrowthRate,
      period: timeFilter,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error calculating ROI:', error);
    return NextResponse.json(
      { error: 'Failed to calculate ROI' },
      { status: 500 }
    );
  }
}