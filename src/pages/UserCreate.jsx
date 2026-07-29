import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUser } from '../services/userService'
import { COMMISSIONS } from '../utils/constants'

export default function UserCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', role: '', office: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.role || !form.office) {
      setError('All fields are required.')
      return
    }
    setIsSaving(true)
    setError('')
    try {
      await createUser(form)
      setIsSaving(false)
      navigate('/users')
    } catch (err) {
      setError(err.message || 'Failed to create user.')
      setIsSaving(false)
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition text-sm'
  const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/users" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Add User</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@psc.gov.np"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>User Role</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Role</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="OFFICE_ADMIN">Office Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="office" className={labelClass}>Office / Commission Assignment</label>
              <select
                id="office"
                name="office"
                value={form.office}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Office</option>
                {COMMISSIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <Link to="/users" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition active:scale-95 shadow-xs"
              >
                {isSaving ? 'Saving...' : 'Save User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
