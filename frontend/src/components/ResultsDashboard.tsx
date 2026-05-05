'use client'

import { PredictionResponse } from '@/services/api'

interface ResultsDashboardProps {
  result: PredictionResponse
  onReset: () => void
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'high':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 740) return 'text-green-600'
    if (score >= 670) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Credit Score */}
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Credit Score</h2>
        <div className={`text-6xl font-bold ${getScoreColor(result.credit_score)}`}>
          {result.credit_score}
        </div>
        <p className="mt-2 text-gray-600">out of 850</p>
      </div>

      {/* Risk Level */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level</h3>
        <div className="flex items-center justify-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.risk_level)}`}>
            {result.risk_level}
          </span>
        </div>
      </div>

      {/* Probability */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Probability</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {(result.probability * 100).toFixed(2)}%
          </div>
          <p className="mt-2 text-gray-600">Chance of default</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Factors</h3>
        <ul className="space-y-2">
          {Object.entries(result.top_features).map(([key, value]) => (
            <li key={key} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Check Another Application
      </button>
    </div>
  )
}