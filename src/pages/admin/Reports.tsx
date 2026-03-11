import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { BarChart3, Download } from 'lucide-react'
import { mockAttendanceRecords, mockPayrollSummary } from '@/data/mock'

export default function AdminReports() {
  const [reportType, setReportType] = useState<'attendance' | 'payroll'>('attendance')
  const [range, setRange] = useState<'week' | 'month'>('week')

  const sampleData = reportType === 'attendance'
    ? mockAttendanceRecords.slice(0, 10)
    : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Reports</h1>
          <p className="text-surface-500 mt-1">Generate and export payroll-ready reports.</p>
        </div>
        <button type="button" className="btn-primary flex items-center gap-2 w-fit">
          <Download className="w-4 h-4" />
          Export report
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-surface-900 mb-4">Report options</h2>
        <div className="flex flex-wrap gap-6">
          <div>
            <label className="label">Report type</label>
            <select
              className="input w-48"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'attendance' | 'payroll')}
            >
              <option value="attendance">Attendance summary</option>
              <option value="payroll">Payroll summary</option>
            </select>
          </div>
          <div>
            <label className="label">Date range</label>
            <select
              className="input w-48"
              value={range}
              onChange={(e) => setRange(e.target.value as 'week' | 'month')}
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-surface-900">
              {reportType === 'attendance' ? 'Attendance summary' : 'Payroll summary'}
            </h2>
            <p className="text-sm text-surface-500">
              {range === 'week'
                ? format(subDays(new Date(), 7), 'MMM d') + ' – ' + format(new Date(), 'MMM d, yyyy')
                : format(subDays(new Date(), 30), 'MMM d') + ' – ' + format(new Date(), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        {reportType === 'payroll' ? (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-surface-200 p-4">
              <p className="text-sm text-surface-500">Total regular hours</p>
              <p className="text-2xl font-semibold text-surface-900 mt-1">
                {mockPayrollSummary.regularHours}h
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 p-4">
              <p className="text-sm text-surface-500">Total overtime</p>
              <p className="text-2xl font-semibold text-surface-900 mt-1">
                {mockPayrollSummary.overtimeHours}h
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 p-4">
              <p className="text-sm text-surface-500">Total amount</p>
              <p className="text-2xl font-semibold text-surface-900 mt-1">
                ${mockPayrollSummary.amount?.toLocaleString() ?? '—'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="pb-3 text-xs font-medium text-surface-500 uppercase">Employee</th>
                  <th className="pb-3 text-xs font-medium text-surface-500 uppercase">Date</th>
                  <th className="pb-3 text-xs font-medium text-surface-500 uppercase">Hours</th>
                  <th className="pb-3 text-xs font-medium text-surface-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((r) => (
                  <tr key={r.id} className="border-b border-surface-100">
                    <td className="py-3 text-sm font-medium text-surface-900">{r.employeeName}</td>
                    <td className="py-3 text-sm text-surface-600">{r.date}</td>
                    <td className="py-3 text-sm text-surface-600">
                      {r.regularHours + r.overtimeHours}h
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-surface-600">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
