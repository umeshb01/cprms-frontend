import { useState, useEffect } from 'react'
import { searchRecommendations } from '../services/recommendationService'
import { COMMISSIONS } from '../utils/constants'

export default function Search() {
  const [filters, setFilters] = useState({
    candidateName: '',
    service: '',
    commission: '',
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  // Dependency array [filters]: Re-runs search on every keystroke or selection change
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    searchRecommendations(filters).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [filters])

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleClear = () => {
    setFilters({ candidateName: '', service: '', commission: '' })
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all text-sm shadow-sm'

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            Search Recommendations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Filter recommendation records dynamically by candidate name, service, or commission
          </p>
        </div>

        {(filters.candidateName || filters.service || filters.commission) && (
          <button
            onClick={handleClear}
            className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter Inputs Grid */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Candidate Name
          </label>
          <input
            name="candidateName"
            value={filters.candidateName}
            onChange={handleChange}
            placeholder="Search by candidate name..."
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Service
          </label>
          <input
            name="service"
            value={filters.service}
            onChange={handleChange}
            placeholder="Search by service..."
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Commission
          </label>
          <select
            name="commission"
            value={filters.commission}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">All Commissions</option>
            {COMMISSIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 text-sm gap-3">
            <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Searching records...
          </div>
        ) : (
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Rec. Number
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Commission
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                      No matching recommendation records found.
                    </td>
                  </tr>
                ) : (
                  results.map((r) => (
                    <tr key={r.id} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono text-indigo-600 font-medium">
                          {r.recommendationNumber}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-800 font-medium">{r.candidateName}</td>
                      <td className="px-5 py-4 text-slate-600">{r.service}</td>
                      <td className="px-5 py-4 text-slate-600">{r.commission}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
              Found {results.length} matching result{results.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
