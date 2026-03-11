import { Clock, Moon, TrendingUp, Save } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Settings</h1>
        <p className="text-surface-500 mt-1">Configure payroll rules and system options.</p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-surface-900 mb-4">Payroll rules</h2>
        <p className="text-sm text-surface-500 mb-6">
          Define how regular, overtime, and night hours are calculated. These rules are used for payroll reports and exports.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg border border-surface-200">
            <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-surface-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-surface-900">Regular hours</p>
              <p className="text-sm text-surface-500">Standard rate · 1.0x</p>
            </div>
            <input
              type="number"
              defaultValue="1"
              step="0.1"
              className="input w-20 text-center"
            />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-surface-200">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-surface-900">Overtime</p>
              <p className="text-sm text-surface-500">After 8h/day · 1.5x</p>
            </div>
            <input
              type="number"
              defaultValue="1.5"
              step="0.1"
              className="input w-20 text-center"
            />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-surface-200">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Moon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-surface-900">Night shift</p>
              <p className="text-sm text-surface-500">22:00 – 06:00 · 1.25x</p>
            </div>
            <input
              type="number"
              defaultValue="1.25"
              step="0.05"
              className="input w-20 text-center"
            />
          </div>
        </div>
        <button type="button" className="btn-primary flex items-center gap-2 mt-6">
          <Save className="w-4 h-4" />
          Save rules
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-surface-900 mb-4">Integrations</h2>
        <p className="text-sm text-surface-500 mb-4">
          Connect to external payroll or accounting systems. (Coming soon.)
        </p>
        <div className="rounded-lg border border-dashed border-surface-300 p-8 text-center text-surface-500 text-sm">
          No integrations configured. API and webhook options will be available when the backend is connected.
        </div>
      </div>
    </div>
  )
}
