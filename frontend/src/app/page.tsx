'use client'

import { useState } from 'react'
import { LoanForm } from '@/components/LoanForm'
import { ResultsDashboard } from '@/components/ResultsDashboard'
import { api, LoanData } from '@/services/api'

interface PredictionResult {
  probability: number
  prediction: number
  risk_level: string
  credit_score: number
  top_features: Record<string, string>
}

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: LoanData) => {
    setLoading(true)
    setError(null)

    try {
      const data = await api.predict(formData)
      setResult(data)
    } catch (err) {
      console.error('Prediction error:', err)
      setError('We could not process the request. Please verify the values and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Credit Risk Dashboard</h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Enter loan details to calculate credit score, risk level, and probability using your FastAPI backend.
              </p>
            </div>
            <div className="rounded-3xl bg-blue-600 px-6 py-4 text-white shadow-lg shadow-blue-500/10">
              <p className="text-sm uppercase tracking-[0.24em] text-blue-200">Live score engine</p>
              <p className="mt-2 text-2xl font-semibold">Fast decision support</p>
            </div>
          </div>
        </header>

        <main className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Loan Application</h2>
              <p className="mt-2 text-sm text-slate-500">
                Fill the form and submit to see the credit score and risk analysis.
              </p>
            </div>

            <LoanForm onSubmit={handleSubmit} loading={loading} />
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </section>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Why this matters</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Fast credit scoring for underwriting and review.</li>
                <li>• Risk indicators help spot high exposure applications.</li>
                <li>• Configured for your FastAPI backend and production CORS.</li>
              </ul>
            </div>

            {result ? (
              <ResultsDashboard result={result} onReset={() => setResult(null)} />
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">Ready to predict</h3>
                <p className="mt-3 text-slate-600">
                  After you submit the form, your score and risk summary will appear here instantly.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
