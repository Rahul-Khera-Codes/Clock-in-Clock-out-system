import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  BarChart3,
  Shield,
  Zap,
  ChevronRight,
  LogIn,
  UserPlus,
  X,
  Check,
  Play,
  FileText,
  Users,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import clsx from 'clsx'

const features = [
  {
    icon: Clock,
    title: 'Clock in & out',
    description: 'One-tap time tracking. Start and end your work sessions from any device.',
  },
  {
    icon: BarChart3,
    title: 'Payroll-ready reports',
    description: 'Automatic calculation of regular, overtime, and night hours for payroll.',
  },
  {
    icon: Shield,
    title: 'Secure & compliant',
    description: 'Centralized records and role-based access for employees and admins.',
  },
  {
    icon: Zap,
    title: 'Export & integrate',
    description: 'CSV and PDF exports. Ready to plug into your payroll or accounting system.',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [role, setRole] = useState<'employee' | 'admin'>('employee')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    }
  }, [user, navigate])

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email || 'demo@company.com', password, role)
      setAuthOpen(false)
      navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function openAuth(m: 'login' | 'signup') {
    setMode(m)
    setError('')
    setAuthOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-surface-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-surface-900">TimeTrack</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
              How it works
            </a>
            <a href="#for-teams" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
              For teams
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors hidden sm:block"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => openAuth('signup')}
              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
            >
              Sign up
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-600 font-medium text-sm uppercase tracking-wider">
            Time tracking & payroll
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 tracking-tight">
            One place to clock in, track hours, and run payroll.
          </h1>
          <p className="mt-5 text-lg text-surface-600">
            Employees punch in and out in seconds. Admins see attendance at a glance and export payroll-ready reports. No spreadsheets, no guesswork.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight">
              Everything you need
            </h2>
            <p className="mt-3 text-lg text-surface-600 max-w-xl mx-auto">
              From clock-in to payroll export — one platform for your team.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-surface-200/80 shadow-card hover:shadow-card-hover hover:border-brand-200/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900">{title}</h3>
                <p className="mt-2 text-sm text-surface-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-surface-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-lg text-surface-600 max-w-xl mx-auto">
              Simple for everyone — whether you track time or manage the team.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <Play className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold text-brand-600">Step 1</span>
              <h3 className="mt-2 text-lg font-semibold text-surface-900">Clock in & out</h3>
              <p className="mt-2 text-surface-600 text-sm">
                Employees start and end their work sessions with one tap. Times are stored instantly and shown on their dashboard.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-100 text-surface-600 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold text-surface-500">Step 2</span>
              <h3 className="mt-2 text-lg font-semibold text-surface-900">Hours are calculated</h3>
              <p className="mt-2 text-surface-600 text-sm">
                The system splits time into regular, overtime, and night hours using your payroll rules. No manual math.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-100 text-surface-600 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold text-surface-500">Step 3</span>
              <h3 className="mt-2 text-lg font-semibold text-surface-900">Export & pay</h3>
              <p className="mt-2 text-surface-600 text-sm">
                Admins review attendance, make adjustments if needed, and export CSV or PDF reports for payroll or accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-surface-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">500+</p>
              <p className="mt-1 text-sm text-surface-400">Hours tracked weekly</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">50+</p>
              <p className="mt-1 text-sm text-surface-400">Teams</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">99%</p>
              <p className="mt-1 text-sm text-surface-400">Uptime</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white">1 tap</p>
              <p className="mt-1 text-sm text-surface-400">To clock in</p>
            </div>
          </div>
        </div>
      </section>

      {/* For employees / For admins */}
      <section id="for-teams" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 tracking-tight">
              Built for both sides of the team
            </h2>
            <p className="mt-3 text-lg text-surface-600 max-w-xl mx-auto">
              One product, two experiences — so everyone gets what they need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-surface-200/80 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900">For employees</h3>
              <p className="mt-3 text-surface-600 text-sm leading-relaxed">
                Log in, open your dashboard, and tap to clock in or out. See your sessions and a summary of regular and overtime hours for the period. Everything in one place, no paperwork.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-surface-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  One-tap clock in & out
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  View session history
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  See regular, overtime & night hours
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-surface-200/80 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-surface-100 text-surface-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900">For admins</h3>
              <p className="mt-3 text-surface-600 text-sm leading-relaxed">
                Monitor attendance, filter by date and status, and make adjustments when needed. Run payroll for any period and export CSV or PDF reports ready for your payroll or accounting system.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-surface-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-500" />
                  Attendance overview & search
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-500" />
                  Payroll calculation by period
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-500" />
                  Export reports (CSV / PDF)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-surface-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 tracking-tight">
            Ready to track time the simple way?
          </h2>
          <p className="mt-3 text-surface-600">
            Log in or sign up to get started. Choose your role and you’re in.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="btn-primary px-6 py-3 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </button>
            <button
              type="button"
              onClick={() => openAuth('signup')}
              className="btn-secondary px-6 py-3 flex items-center gap-2"
            >
              Sign up
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Auth modal (Log in / Sign up via header buttons only) */}
      {authOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-surface-900/50 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setAuthOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-200 scale-100 opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-surface-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-surface-900">
                  {mode === 'login' ? 'Log in' : 'Sign up'}
                </h3>
                <button
                  type="button"
                  onClick={() => setAuthOpen(false)}
                  className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-1 p-1 rounded-xl bg-surface-100 mb-5">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError('') }}
                    className={clsx(
                      'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                      mode === 'login' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-600'
                    )}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError('') }}
                    className={clsx(
                      'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                      mode === 'signup' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-600'
                    )}
                  >
                    Sign up
                  </button>
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  )}
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    />
                  </div>
                  <div>
                    <label className="label">I am a</label>
                    <div className="flex gap-2 p-1 rounded-lg bg-surface-100">
                      <button
                        type="button"
                        onClick={() => setRole('employee')}
                        className={clsx(
                          'flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2',
                          role === 'employee' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-600'
                        )}
                      >
                        <UserPlus className="w-4 h-4" />
                        Employee
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('admin')}
                        className={clsx(
                          'flex-1 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2',
                          role === 'admin' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-600'
                        )}
                      >
                        <Shield className="w-4 h-4" />
                        Admin
                      </button>
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : mode === 'login' ? (
                      'Log in'
                    ) : (
                      'Create account'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-surface-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-surface-900">TimeTrack</span>
          </div>
          <p className="text-sm text-surface-500">
            © {new Date().getFullYear()} TimeTrack. Time tracking & payroll.
          </p>
        </div>
      </footer>
    </div>
  )
}
