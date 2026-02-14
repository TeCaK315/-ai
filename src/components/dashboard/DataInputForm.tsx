'use client';

import React, { useState } from 'react';
import { saveROIData, loadROIData } from '@/lib/storage';
import type { ROIData } from '@/types';
import { Save, X } from 'lucide-react';

interface DataInputFormProps {
  onDataAdded: () => void;
}

export function DataInputForm({ onDataAdded }: DataInputFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    costs: '',
    revenue: '',
    automationTool: '',
    leadsGenerated: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    const costs = parseFloat(formData.costs);
    if (!formData.costs || isNaN(costs) || costs < 0) {
      newErrors.costs = 'Valid cost amount is required';
    }

    const revenue = parseFloat(formData.revenue);
    if (!formData.revenue || isNaN(revenue) || revenue < 0) {
      newErrors.revenue = 'Valid revenue amount is required';
    }

    if (!formData.automationTool.trim()) {
      newErrors.automationTool = 'Automation tool name is required';
    }

    const leads = parseInt(formData.leadsGenerated);
    if (!formData.leadsGenerated || isNaN(leads) || leads < 0) {
      newErrors.leadsGenerated = 'Valid number of leads is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const newEntry: ROIData = {
      id: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: formData.date,
      costs: parseFloat(formData.costs),
      revenue: parseFloat(formData.revenue),
      automationTool: formData.automationTool.trim(),
      leadsGenerated: parseInt(formData.leadsGenerated),
      createdAt: new Date().toISOString()
    };

    const existingData = loadROIData();
    const updatedData = [...existingData, newEntry];
    saveROIData(updatedData);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      costs: '',
      revenue: '',
      automationTool: '',
      leadsGenerated: ''
    });
    setErrors({});
    setIsSubmitting(false);
    onDataAdded();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Sales Data</h2>
        <Save className="w-6 h-6 text-secondary" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-dark w-full"
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Automation Tool <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="automationTool"
              value={formData.automationTool}
              onChange={handleChange}
              placeholder="e.g., HubSpot, Salesforce"
              className="input-dark w-full"
            />
            {errors.automationTool && <p className="text-red-400 text-sm mt-1">{errors.automationTool}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Costs ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="costs"
              value={formData.costs}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input-dark w-full"
            />
            {errors.costs && <p className="text-red-400 text-sm mt-1">{errors.costs}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Revenue ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input-dark w-full"
            />
            {errors.revenue && <p className="text-red-400 text-sm mt-1">{errors.revenue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Leads Generated <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="leadsGenerated"
              value={formData.leadsGenerated}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input-dark w-full"
            />
            {errors.leadsGenerated && <p className="text-red-400 text-sm mt-1">{errors.leadsGenerated}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="gradient-button"
          >
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
}