import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Clock, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import clsx from 'clsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/sessions', label: 'My Sessions', icon: Clock },
]

export default function EmployeeLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <aside className="w-64 border-r border-surface-200 bg-white flex flex-col shrink-0">
        <div className="p-6 border-b border-surface-100">
          <h1 className="text-xl font-semibold text-surface-900 tracking-tight">TimeTrack</h1>
          <p className="text-xs text-surface-500 mt-0.5">Clock-in &amp; hours</p>
        </div>
        <nav className="p-3 flex-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-surface-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-50">
            <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
              {user?.name?.charAt(0) ?? 'E'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-surface-900 truncate">{user?.name}</p>
              <p className="text-xs text-surface-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-50 hover:text-surface-900 mt-1 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
