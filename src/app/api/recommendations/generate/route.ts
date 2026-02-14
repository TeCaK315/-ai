import { NextRequest, NextResponse } from 'next/server';
import { OptimizationRecommendation } from '@/types';
import {
  generateRecommendations,
  analyzeEfficiency,
  identifyBottlenecks,
} from '@/lib/recommendation-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roiData, costs, revenue, leadsGenerated, automationTool } = body;

    if (!Array.isArray(roiData)) {
      return NextResponse.json(
        { error: 'Invalid input: roiData must be an array' },
        { status: 400 }
      );
    }

    const totalCosts = typeof costs === 'number' ? costs : 0;
    const totalRevenue = typeof revenue === 'number' ? revenue : 0;
    const totalLeads = typeof leadsGenerated === 'number' ? leadsGenerated : 0;
    const tool = typeof automationTool === 'string' ? automationTool : 'Unknown';

    const efficiency = analyzeEfficiency(totalCosts, totalRevenue, totalLeads);
    const bottlenecks = identifyBottlenecks(roiData, efficiency);

    const recommendations = generateRecommendations(
      roiData,
      efficiency,
      bottlenecks,
      {
        costs: totalCosts,
        revenue: totalRevenue,
        leadsGenerated: totalLeads,
        automationTool: tool,
      }
    );

    return NextResponse.json(recommendations, { status: 200 });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}