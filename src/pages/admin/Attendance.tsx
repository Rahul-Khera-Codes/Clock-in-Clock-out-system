import { useState } from 'react'
import { format } from 'date-fns'
import { Search, Download, Edit2 } from 'lucide-react'
import { mockAttendanceRecords } from '@/data/mock'
import type { AttendanceRecord } from '@/types'

const statusColors: Record<AttendanceRecord['status'], string> = {
  present: 'bg-brand-100 text-brand-700',
  absent: 'bg-amber-100 text-amber-700',
  leave: 'bg-surface-100 text-surface-700',
  adjusted: 'bg-indigo-100 text-indigo-700',
}

export default function AdminAttendance() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const filtered = mockAttendanceRecords.filter((r) => {
    const matchSearch =
      r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search)
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Attendance</h1>
          <p className="text-surface-500 mt-1">View and manage employee attendance records.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name or date..."
              className="input pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="input w-auto min-w-[140px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">Leave</option>
              <option value="adjusted">Adjusted</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-surface-200 bg-surface-50/80">
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Employee
                </th>
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
                  Regular
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50/50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-surface-900">{r.employeeName}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-surface-700">{r.date}</td>
                  <td className="px-5 py-3 text-sm font-mono text-surface-700">
                    {r.clockIn ? format(new Date(r.clockIn), 'HH:mm') : '—'}
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-surface-700">
                    {r.clockOut ? format(new Date(r.clockOut), 'HH:mm') : '—'}
                  </td>
                  <td className="px-5 py-3 text-sm text-surface-700">{r.regularHours}h</td>
                  <td className="px-5 py-3 text-sm text-surface-700">{r.overtimeHours}h</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-surface-500">
            No records match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
