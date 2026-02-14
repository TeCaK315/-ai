import { ROIData, OptimizationRecommendation } from '@/types';
import { calculateROIPercentage, calculateCostPerAcquisition } from './roi-calculator';

export function analyzeEfficiency(data: ROIData[]): {
  averageROI: number;
  averageCPA: number;
  costEfficiency: number;
  revenueConsistency: number;
} {
  if (data.length === 0) {
    return {
      averageROI: 0,
      averageCPA: 0,
      costEfficiency: 0,
      revenueConsistency: 0,
    };
  }

  const totalCosts = data.reduce((sum, entry) => sum + entry.costs, 0);
  const totalRevenue = data.reduce((sum, entry) => sum + entry.revenue, 0);
  const totalLeads = data.reduce((sum, entry) => sum + entry.leadsGenerated, 0);

  const averageROI = calculateROIPercentage(totalCosts, totalRevenue);
  const averageCPA = calculateCostPerAcquisition(totalCosts, totalLeads);

  const costEfficiency = totalCosts > 0 ? (totalRevenue / totalCosts) * 100 : 0;

  const revenues = data.map(entry => entry.revenue);
  const avgRevenue = revenues.reduce((sum, r) => sum + r, 0) / revenues.length;
  const variance = revenues.reduce((sum, r) => sum + Math.pow(r - avgRevenue, 2), 0) / revenues.length;
  const stdDev = Math.sqrt(variance);
  const revenueConsistency = avgRevenue > 0 ? Math.max(0, 100 - (stdDev / avgRevenue) * 100) : 0;

  return {
    averageROI,
    averageCPA,
    costEfficiency,
    revenueConsistency,
  };
}

export function identifyBottlenecks(data: ROIData[]): {
  highCostTools: string[];
  lowPerformingPeriods: string[];
  inefficientLeadGeneration: boolean;
} {
  if (data.length === 0) {
    return {
      highCostTools: [],
      lowPerformingPeriods: [],
      inefficientLeadGeneration: false,
    };
  }

  const toolCosts = new Map<string, { cost: number; revenue: number }>();
  data.forEach(entry => {
    const existing = toolCosts.get(entry.automationTool) || { cost: 0, revenue: 0 };
    toolCosts.set(entry.automationTool, {
      cost: existing.cost + entry.costs,
      revenue: existing.revenue + entry.revenue,
    });
  });

  const highCostTools: string[] = [];
  toolCosts.forEach((metrics, tool) => {
    const roi = calculateROIPercentage(metrics.cost, metrics.revenue);
    if (roi < 50) {
      highCostTools.push(tool);
    }
  });

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const lowPerformingPeriods: string[] = [];
  sortedData.forEach(entry => {
    const roi = calculateROIPercentage(entry.costs, entry.revenue);
    if (roi < 30) {
      lowPerformingPeriods.push(entry.date);
    }
  });

  const totalCosts = data.reduce((sum, entry) => sum + entry.costs, 0);
  const totalLeads = data.reduce((sum, entry) => sum + entry.leadsGenerated, 0);
  const avgCPA = calculateCostPerAcquisition(totalCosts, totalLeads);
  const inefficientLeadGeneration = avgCPA > 100;

  return {
    highCostTools,
    lowPerformingPeriods: lowPerformingPeriods.slice(0, 5),
    inefficientLeadGeneration,
  };
}

export function generateRecommendations(data: ROIData[]): OptimizationRecommendation[] {
  if (data.length === 0) {
    return [];
  }

  const efficiency = analyzeEfficiency(data);
  const bottlenecks = identifyBottlenecks(data);
  const recommendations: OptimizationRecommendation[] = [];

  // Cost reduction recommendations
  if (bottlenecks.highCostTools.length > 0) {
    recommendations.push({
      id: `rec_${Date.now()}_1`,
      title: 'Optimize High-Cost Automation Tools',
      description: `Tools with low ROI detected: ${bottlenecks.highCostTools.join(', ')}. Consider renegotiating contracts or switching to more cost-effective alternatives.`,
      priority: 'high',
      category: 'cost_reduction',
      estimatedImpact: 25,
      actionItems: [
        'Review current tool subscriptions and usage',
        'Compare with alternative solutions',
        'Negotiate better pricing with vendors',
        'Consider consolidating tools'
      ],
      implementationDifficulty: 'medium'
    });
  }

  // Revenue increase recommendations
  if (efficiency.averageROI < 100) {
    recommendations.push({
      id: `rec_${Date.now()}_2`,
      title: 'Improve Lead Conversion Strategy',
      description: 'Current ROI is below optimal levels. Focus on improving lead quality and conversion rates.',
      priority: 'high',
      category: 'revenue_increase',
      estimatedImpact: 35,
      actionItems: [
        'Implement lead scoring system',
        'Optimize sales funnel',
        'Enhance follow-up processes',
        'Train sales team on automation tools'
      ],
      implementationDifficulty: 'medium'
    });
  }

  // Efficiency recommendations
  if (efficiency.costEfficiency < 150) {
    recommendations.push({
      id: `rec_${Date.now()}_3`,
      title: 'Enhance Automation Efficiency',
      description: 'Cost efficiency can be improved. Automate more manual processes and optimize workflows.',
      priority: 'medium',
      category: 'efficiency',
      estimatedImpact: 20,
      actionItems: [
        'Identify manual bottlenecks',
        'Implement workflow automation',
        'Set up automated reporting',
        'Integrate systems for better data flow'
      ],
      implementationDifficulty: 'easy'
    });
  }

  // Lead generation efficiency
  if (bottlenecks.inefficientLeadGeneration) {
    recommendations.push({
      id: `rec_${Date.now()}_4`,
      title: 'Reduce Cost Per Acquisition',
      description: 'CPA is higher than industry benchmarks. Optimize lead generation channels and targeting.',
      priority: 'high',
      category: 'cost_reduction',
      estimatedImpact: 30,
      actionItems: [
        'Analyze lead sources by CPA',
        'Focus budget on high-performing channels',
        'Improve targeting and segmentation',
        'A/B test lead generation campaigns'
      ],
      implementationDifficulty: 'medium'
    });
  }

  // Revenue consistency
  if (efficiency.revenueConsistency < 70) {
    recommendations.push({
      id: `rec_${Date.now()}_5`,
      title: 'Stabilize Revenue Streams',
      description: 'Revenue shows high variability. Implement strategies for more consistent performance.',
      priority: 'medium',
      category: 'revenue_increase',
      estimatedImpact: 15,
      actionItems: [
        'Develop recurring revenue models',
        'Implement customer retention programs',
        'Create predictable sales pipeline',
        'Balance seasonal fluctuations'
      ],
      implementationDifficulty: 'hard'
    });
  }

  // Automation expansion
  if (efficiency.averageROI > 150) {
    recommendations.push({
      id: `rec_${Date.now()}_6`,
      title: 'Scale Successful Automation',
      description: 'Strong ROI indicates successful automation. Consider expanding to additional processes.',
      priority: 'low',
      category: 'automation',
      estimatedImpact: 40,
      actionItems: [
        'Identify additional automation opportunities',
        'Replicate successful workflows',
        'Expand to new markets or segments',
        'Invest in advanced AI capabilities'
      ],
      implementationDifficulty: 'medium'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}