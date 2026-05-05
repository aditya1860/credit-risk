'use client'

import { useState, type FormEvent } from 'react'
import { LoanData } from '@/services/api'

interface LoanFormProps {
  onSubmit: (data: LoanData) => void
  loading: boolean
}

const homeOwnershipOptions = ['RENT', 'MORTGAGE', 'OWN', 'OTHER']
const purposeOptions = [
  'debt_consolidation',
  'credit_card',
  'home_improvement',
  'major_purchase',
  'small_business',
  'medical',
  'vacation',
  'renewable_energy',
  'moving',
  'educational',
  'wedding',
  'house',
  'other',
]
const stateOptions = ['CA', 'NY', 'TX', 'FL', 'NJ', 'PA', 'IL', 'GA', 'VA', 'WA']

export function LoanForm({ onSubmit, loading }: LoanFormProps) {
  const [formData, setFormData] = useState<LoanData>({
    age: 30,
    annual_inc: 50000,
    loan_amnt: 10000,
    emp_length: 5,
    delinq_2yrs: 0,
    home_ownership: 'RENT',
    addr_state: 'CA',
    purpose: 'debt_consolidation',
    term: 36,
    int_rate: 12.5,
    mths_since_earliest_cr_line: 200,
    inq_last_6mths: 1,
    open_acc: 5,
    pub_rec: 0,
    total_acc: 10,
    acc_now_delinq: 0,
    total_rev_hi_lim: 15000,
    mths_since_last_delinq: null,
    dti: 15.0,
    mths_since_last_record: null,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof LoanData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => handleChange('age', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min={18}
              max={100}
            />
          </div>

          <div>
            <label htmlFor="annual_inc" className="block text-sm font-medium text-slate-700">
              Annual Income ($)
            </label>
            <input
              type="number"
              id="annual_inc"
              value={formData.annual_inc}
              onChange={(e) => handleChange('annual_inc', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min={0}
            />
          </div>

          <div>
            <label htmlFor="loan_amnt" className="block text-sm font-medium text-slate-700">
              Loan Amount ($)
            </label>
            <input
              type="number"
              id="loan_amnt"
              value={formData.loan_amnt}
              onChange={(e) => handleChange('loan_amnt', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min={0}
            />
          </div>

          <div>
            <label htmlFor="emp_length" className="block text-sm font-medium text-slate-700">
              Employment Length (years)
            </label>
            <select
              id="emp_length"
              value={formData.emp_length}
              onChange={(e) => handleChange('emp_length', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {Array.from({ length: 11 }, (_, index) => (
                <option key={index} value={index}>
                  {index === 0 ? 'Less than 1 year' : `${index} year${index > 1 ? 's' : ''}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="home_ownership" className="block text-sm font-medium text-slate-700">
              Home Ownership
            </label>
            <select
              id="home_ownership"
              value={formData.home_ownership}
              onChange={(e) => handleChange('home_ownership', e.target.value)}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {homeOwnershipOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-slate-700">
              Loan Purpose
            </label>
            <select
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {purposeOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace('_', ' ').replace(/\w/g, (chr) => chr.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="addr_state" className="block text-sm font-medium text-slate-700">
              State
            </label>
            <select
              id="addr_state"
              value={formData.addr_state}
              onChange={(e) => handleChange('addr_state', e.target.value)}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="int_rate" className="block text-sm font-medium text-slate-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="int_rate"
              value={formData.int_rate}
              onChange={(e) => handleChange('int_rate', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="dti" className="block text-sm font-medium text-slate-700">
              Debt-to-Income Ratio (%)
            </label>
            <input
              type="number"
              id="dti"
              value={formData.dti}
              onChange={(e) => handleChange('dti', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              step="0.1"
              min="0"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="mths_since_earliest_cr_line" className="block text-sm font-medium text-slate-700">
              Months Since Earliest Credit Line
            </label>
            <input
              type="number"
              id="mths_since_earliest_cr_line"
              value={formData.mths_since_earliest_cr_line}
              onChange={(e) => handleChange('mths_since_earliest_cr_line', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="inq_last_6mths" className="block text-sm font-medium text-slate-700">
              Inquiries Last 6 Months
            </label>
            <input
              type="number"
              id="inq_last_6mths"
              value={formData.inq_last_6mths}
              onChange={(e) => handleChange('inq_last_6mths', Number(e.target.value))}
              className="mt-1 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Get Credit Score'}
        </button>
      </form>
    </div>
  )
}
