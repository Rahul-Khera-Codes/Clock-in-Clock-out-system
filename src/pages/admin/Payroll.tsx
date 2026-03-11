import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { FileText, Download, Calculator } from 'lucide-react'
import { mockPayrollSummary } from '@/data/mock'

export default function AdminPayroll() {
  const [periodStart, setPeriodStart] = useState(format(subDays(new Date(), 14), 'yyyy-MM-dd'))
  const [periodEnd, setPeriodEnd] = useState(format(new Date(), 'yyyy-MM-dd'))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Payroll</h1>
        <p className="text-surface-500 mt-1">Calculate and export payroll from attendance data.</p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-surface-900 mb-4">Pay period</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="label">Start date</label>
            <input
              type="date"
              className="input w-40"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
            />
          </div>
          <div>
            <label className="label">End date</label>
            <input
              type="date"
              className="input w-40"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
            />
          </div>
          <button type="button" className="btn-primary flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculate payroll
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="text-sm text-surface-500">Period</p>
          <p className="text-lg font-medium text-surface-900 mt-1">{mockPayrollSummary.period}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-surface-500">Total regular hours</p>
          <p className="text-2xl font-semibold text-surface-900 mt-1">
            {mockPayrollSummary.regularHours}h
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-surface-500">Total overtime</p>
          <p className="text-2xl font-semibold text-surface-900 mt-1">
            {mockPayrollSummary.overtimeHours}h
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-surface-500">Estimated amount</p>
          <p className="text-2xl font-semibold text-surface-900 mt-1">
            ${mockPayrollSummary.amount?.toLocaleString() ?? '—'}
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-surface-900 mb-4">Export</h2>
        <p className="text-sm text-surface-500 mb-4">
          Export payroll data for your accounting or payroll system.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button type="button" className="btn-secondary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Export PDF report
          </button>
        </div>
      </div>
    </div>
  )
}
