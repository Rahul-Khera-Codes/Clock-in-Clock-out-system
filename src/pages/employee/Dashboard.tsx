import { useState } from 'react'
import { format } from 'date-fns'
import { Clock, Play, Square, TrendingUp, Moon, Zap } from 'lucide-react'
import { mockSessions, mockPayrollSummary } from '@/data/mock'

export default function EmployeeDashboard() {
  const [clockedIn, setClockedIn] = useState(
    () => mockSessions.some((s) => s.status === 'active')
  )
  const currentTime = format(new Date(), 'HH:mm')
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Dashboard</h1>
        <p className="text-surface-500 mt-1">Track your time and view your hours.</p>
      </div>

      {/* Clock card */}
      <div className="card p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-surface-500 text-sm font-medium uppercase tracking-wider">
              {currentDate}
            </p>
            <p className="text-4xl md:text-5xl font-semibold text-surface-900 mt-2 font-mono tabular-nums">
              {currentTime}
            </p>
            <p className={clockedIn ? 'text-brand-600 font-medium mt-2' : 'text-surface-500 mt-2'}>
              {clockedIn ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                  You are clocked in
                </span>
              ) : (
                'Not clocked in'
              )}
            </p>
          </div>
          <div className="flex gap-3">
            {clockedIn ? (
              <button
                type="button"
                onClick={() => setClockedIn(false)}
                className="btn flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-medium"
              >
                <Square className="w-5 h-5" />
                Clock out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setClockedIn(true)}
                className="btn-primary flex items-center gap-2 px-6 py-3"
              >
                <Play className="w-5 h-5" />
                Clock in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div>
        <h2 className="text-lg font-medium text-surface-900 mb-4">This period</h2>
        <p className="text-sm text-surface-500 mb-4">{mockPayrollSummary.period}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-surface-600" />
              </div>
              <div>
                <p className="text-sm text-surface-500">Regular hours</p>
                <p className="text-xl font-semibold text-surface-900">
                  {mockPayrollSummary.regularHours}h
                </p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-surface-500">Overtime</p>
                <p className="text-xl font-semibold text-surface-900">
                  {mockPayrollSummary.overtimeHours}h
                </p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Moon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-surface-500">Night hours</p>
                <p className="text-xl font-semibold text-surface-900">
                  {mockPayrollSummary.nightHours}h
                </p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm text-surface-500">Total</p>
                <p className="text-xl font-semibold text-surface-900">
                  {mockPayrollSummary.totalHours}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent session */}
      <div>
        <h2 className="text-lg font-medium text-surface-900 mb-4">Latest session</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-200 bg-surface-50/80">
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Clock in
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Clock out
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockSessions.slice(0, 3).map((s) => (
                <tr key={s.id} className="border-b border-surface-100 last:border-0">
                  <td className="px-5 py-3 text-sm text-surface-900">
                    {format(new Date(s.clockIn), 'MMM d, yyyy')}
                  </td>
                  <td className="px-5 py-3 text-sm text-surface-700 font-mono">
                    {format(new Date(s.clockIn), 'HH:mm')}
                  </td>
                  <td className="px-5 py-3 text-sm text-surface-700 font-mono">
                    {s.clockOut ? format(new Date(s.clockOut), 'HH:mm') : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        s.status === 'active'
                          ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700'
                          : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-surface-700'
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
