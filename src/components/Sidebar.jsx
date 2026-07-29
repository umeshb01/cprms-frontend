import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'

export default function Sidebar() {
  const location = useLocation()
  const { t } = useLanguage()

  // TODO: Restrict Master Data access to Admin role once backend auth context and roles exist
  const navItems = [
    { label: t('dashboard'), path: '/dashboard' },
    { label: t('recommendations'), path: '/recommendations' },
    { label: t('search'), path: '/search' },
    { label: t('reports'), path: '/reports' },
    { label: t('masterData'), path: '/master-data' },
    { label: t('auditLog'), path: '/audit-logs' },
    { label: t('users'), path: '/users' },
    { label: t('home'), path: '/home' },
  ]

  return (
    <aside className="w-56 bg-gray-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold tracking-tight">CPRMS</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded text-sm font-medium transition ${
                location.pathname === item.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Language Switcher Footer */}
      <div className="pt-4 border-t border-gray-800">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 px-1">
          Language / भाषा
        </p>
        <LanguageSwitcher />
      </div>
    </aside>
  )
}