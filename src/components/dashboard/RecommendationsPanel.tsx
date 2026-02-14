'use client';

import React from 'react';
import type { OptimizationRecommendation } from '@/types';
import { Lightbulb, TrendingUp, DollarSign, Zap, AlertCircle } from 'lucide-react';

interface RecommendationsPanelProps {
  recommendations: OptimizationRecommendation[];
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cost_reduction':
        return DollarSign;
      case 'revenue_increase':
        return TrendingUp;
      case 'efficiency':
        return Zap;
      case 'automation':
        return Lightbulb;
      default:
        return AlertCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium':
        return 'bg-accent/20 text-accent border-accent/50';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-secondary';
      case 'medium':
        return 'text-accent';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center shadow-xl">
        <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-600" />
        <p className="text-gray-400">No recommendations available yet. Add more data to get insights.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
      <div className="flex items-center mb-6">
        <Lightbulb className="w-6 h-6 mr-2 text-accent" />
        <h2 className="text-2xl font-bold">AI Optimization Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const CategoryIcon = getCategoryIcon(rec.category);
          
          return (
            <div
              key={rec.id}
              className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                    <p className="text-gray-400 text-sm">{rec.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <span className="text-gray-500">Impact: </span>
                    <span className="text-secondary font-semibold">+{rec.estimatedImpact}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Difficulty: </span>
                    <span className={`font-semibold ${getDifficultyColor(rec.implementationDifficulty)}`}>
                      {rec.implementationDifficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-300 mb-2">Action Items:</p>
                <ul className="space-y-1">
                  {rec.actionItems.map((item, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}