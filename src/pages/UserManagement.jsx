import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, deleteUser } from '../services/userService'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = () => {
    setLoading(true)
    setError(null)
    getUsers()
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load users.')
        setLoading(false)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove user "${name}"?`)) return
    try {
      await deleteUser(id)
      loadData()
    } catch (err) {
      alert(err.message || 'Failed to delete user.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <svg className="animate-spin w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading users…
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage system administrators, staff access roles, and commission assignments
          </p>
        </div>
        <Link
          to="/users/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition active:scale-95 shadow-xs self-start sm:self-auto"
        >
          <span className="text-lg leading-none">+</span> Add User
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          ⚠ {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Office</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800">{u.name}</td>
                  <td className="px-5 py-4 text-slate-600 font-mono text-xs">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                      u.role === 'SUPER_ADMIN'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{u.office}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          {users.length} user{users.length !== 1 ? 's' : ''} total
        </div>
      </div>
    </div>
  )
}
