import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Users, Clock, FileCheck, AlertCircle } from 'lucide-react'
import { mockAttendanceRecords } from '@/data/mock'

export default function AdminDashboard() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const presentToday = mockAttendanceRecords.filter(
    (r) => r.date === today && (r.status === 'present' || r.status === 'adjusted')
  ).length
  const absentToday = mockAttendanceRecords.filter((r) => r.date === today && r.status === 'absent').length
  const totalEmployees = 4
  const pendingAdjustments = mockAttendanceRecords.filter((r) => r.status === 'adjusted').length

  const stats = [
    {
      label: 'Present today',
      value: presentToday,
      sub: `of ${totalEmployees} employees`,
      icon: Clock,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      label: 'Absent today',
      value: absentToday,
      sub: 'requires review',
      icon: AlertCircle,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Total employees',
      value: totalEmployees,
      sub: 'active',
      icon: Users,
      color: 'bg-surface-100 text-surface-600',
    },
    {
      label: 'Pending adjustments',
      value: pendingAdjustments,
      sub: 'attendance edits',
      icon: FileCheck,
      color: 'bg-indigo-50 text-indigo-600',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Dashboard</h1>
        <p className="text-surface-500 mt-1">Overview of attendance and payroll.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-surface-500">{label}</p>
                <p className="text-2xl font-semibold text-surface-900 mt-1">{value}</p>
                <p className="text-xs text-surface-400 mt-0.5">{sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-medium text-surface-900 mb-4">Recent attendance</h2>
          <div className="space-y-3">
            {mockAttendanceRecords.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-surface-900">{r.employeeName}</p>
                  <p className="text-xs text-surface-500">
                    {format(new Date(r.date), 'MMM d')} · {r.clockIn ? format(new Date(r.clockIn), 'HH:mm') : '—'} –{' '}
                    {r.clockOut ? format(new Date(r.clockOut), 'HH:mm') : '—'}
                  </p>
                </div>
                <span
                  className={
                    r.status === 'present' || r.status === 'adjusted'
                      ? 'text-xs font-medium text-brand-600'
                      : r.status === 'absent'
                        ? 'text-xs font-medium text-amber-600'
                        : 'text-xs font-medium text-surface-500'
                  }
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-medium text-surface-900 mb-4">Quick actions</h2>
          <div className="space-y-2">
            <Link
              to="/admin/attendance"
              className="block rounded-lg border border-surface-200 px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
            >
              Review attendance records
            </Link>
            <Link
              to="/admin/payroll"
              className="block rounded-lg border border-surface-200 px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
            >
              Run payroll calculation
            </Link>
            <Link
              to="/admin/reports"
              className="block rounded-lg border border-surface-200 px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
            >
              Export payroll report
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
