import { Link, useLocation } from 'react-router-dom'

const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Recommendations', path: '/recommendations' },
    { label: 'Home', path: '/home' },
]

export default function Sidebar() {
    const location = useLocation()

    return (
        <aside className="w-56 bg-gray-900 text-white min-h-screen p-4">
            <h2 className="text-lg font-bold mb-6">CPRMS</h2>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 rounded ${location.pathname === item.path ? 'bg-indigo-600' : 'hover:bg-gray-800'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}