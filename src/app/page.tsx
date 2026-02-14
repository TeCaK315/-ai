'use client';

import React, { useState, useEffect } from 'react';
import { ROIOverviewCards } from '@/components/dashboard/ROIOverviewCards';
import { ROIChart } from '@/components/dashboard/ROIChart';
import { CostRevenueChart } from '@/components/dashboard/CostRevenueChart';
import { DataInputForm } from '@/components/dashboard/DataInputForm';
import { RecommendationsPanel } from '@/components/dashboard/RecommendationsPanel';
import { TimeFilterBar } from '@/components/dashboard/TimeFilterBar';
import { loadROIData } from '@/lib/storage';
import { generateROIReport } from '@/lib/roi-calculator';
import { generateRecommendations } from '@/lib/recommendation-engine';
import type { ROIData, ROIReport, OptimizationRecommendation, TimeFilter } from '@/types';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [roiData, setRoiData] = useState<ROIData[]>([]);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30d');
  const [roiReport, setRoiReport] = useState<ROIReport | null>(null);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (roiData.length > 0) {
      calculateMetrics();
      generateOptimizationRecommendations();
    }
  }, [roiData, timeFilter]);

  const loadData = () => {
    setIsLoading(true);
    const data = loadROIData();
    setRoiData(data);
    setIsLoading(false);
  };

  const calculateMetrics = () => {
    const report = generateROIReport(roiData, timeFilter);
    setRoiReport(report);
  };

  const generateOptimizationRecommendations = () => {
    const recs = generateRecommendations(roiData);
    setRecommendations(recs);
  };

  const handleDataAdded = () => {
    loadData();
    setShowForm(false);
  };

  const handleTimeFilterChange = (filter: TimeFilter) => {
    setTimeFilter(filter);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Sales Automation ROI Dashboard
            </h1>
            <p className="text-gray-400">Track, analyze, and optimize your sales automation performance</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="gradient-button"
          >
            {showForm ? 'Hide Form' : 'Add Data'}
          </button>
        </div>

        {/* Data Input Form */}
        {showForm && (
          <div className="animate-slide-up">
            <DataInputForm onDataAdded={handleDataAdded} />
          </div>
        )}

        {/* Time Filter */}
        <TimeFilterBar currentFilter={timeFilter} onFilterChange={handleTimeFilterChange} />

        {/* ROI Overview Cards */}
        {roiReport && (
          <div className="animate-fade-in">
            <ROIOverviewCards report={roiReport} />
          </div>
        )}

        {/* Charts Section */}
        {roiData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                <h2 className="text-2xl font-bold">ROI Trend</h2>
              </div>
              <ROIChart data={roiData} />
            </div>

            <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 mr-2 text-secondary" />
                <h2 className="text-2xl font-bold">Cost vs Revenue</h2>
              </div>
              <CostRevenueChart data={roiData} />
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-12 text-center shadow-xl border border-gray-800">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
            <p className="text-gray-400 mb-6">Start by adding your sales automation data to see insights and recommendations.</p>
            <button
              onClick={() => setShowForm(true)}
              className="gradient-button"
            >
              Add Your First Entry
            </button>
          </div>
        )}

        {/* Recommendations Panel */}
        {recommendations.length > 0 && (
          <div className="animate-fade-in">
            <RecommendationsPanel recommendations={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}