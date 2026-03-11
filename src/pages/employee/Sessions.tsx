import { format } from 'date-fns'
import { mockSessions } from '@/data/mock'
import { Clock } from 'lucide-react'

export default function EmployeeSessions() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">My Sessions</h1>
        <p className="text-surface-500 mt-1">View and manage your clock-in / clock-out history.</p>
      </div>

      <div className="card overflow-hidden">
        {mockSessions.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <p className="text-surface-500">No sessions yet. Clock in to start tracking.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
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
                    Regular
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                    Overtime
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockSessions.map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50/50">
                    <td className="px-5 py-3 text-sm text-surface-900">
                      {format(new Date(s.clockIn), 'MMM d, yyyy')}
                    </td>
                    <td className="px-5 py-3 text-sm text-surface-700 font-mono">
                      {format(new Date(s.clockIn), 'HH:mm')}
                    </td>
                    <td className="px-5 py-3 text-sm text-surface-700 font-mono">
                      {s.clockOut ? format(new Date(s.clockOut), 'HH:mm') : '—'}
                    </td>
                    <td className="px-5 py-3 text-sm text-surface-700">
                      {s.regularMinutes != null ? `${(s.regularMinutes / 60).toFixed(1)}h` : '—'}
                    </td>
                    <td className="px-5 py-3 text-sm text-surface-700">
                      {s.overtimeMinutes != null && s.overtimeMinutes > 0
                        ? `${(s.overtimeMinutes / 60).toFixed(1)}h`
                        : '—'}
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
        )}
      </div>
    </div>
  )
}
