import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { publicSearch } from '../services/recommendationService'
import PublicResultCard from '../components/PublicResultCard'

export default function PublicSearch() {
  const [filters, setFilters] = useState({ name: '', recNumber: '' })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // useEffect guard condition: If the user hasn't searched yet, do NOT fetch data.
  // This avoids dumping all citizen records on initial page load.
  useEffect(() => {
    if (!searched) return

    let cancelled = false
    setLoading(true)

    publicSearch(filters).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [filters, searched])

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
    if (!searched) setSearched(true)
  }

  const handleClear = () => {
    setFilters({ name: '', recNumber: '' })
    setResults([])
    setSearched(false)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition text-sm shadow-sm'

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800">
      {/* Top Header / Public Nav */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              C
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-slate-800 leading-none">
                CPRMS Citizen Portal
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Public Recommendation Verification</p>
            </div>
          </div>

          <Link
            to="/login"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3.5 py-2 rounded-lg transition"
          >
            Staff Sign In →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-3">
            🔍 Official Public Verification
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Verify Recommendation Record
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Search public civil service recommendation records published by official selection commissions. No sign-in required.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Candidate Name
              </label>
              <input
                id="name"
                name="name"
                value={filters.name}
                onChange={handleChange}
                placeholder="e.g. Ram Prasad Sharma"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="recNumber" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Recommendation Number
              </label>
              <input
                id="recNumber"
                name="recNumber"
                value={filters.recNumber}
                onChange={handleChange}
                placeholder="e.g. REC-2081-001"
                className={inputClass}
              />
            </div>
          </div>

          {searched && (
            <div className="flex justify-end pt-1">
              <button
                onClick={handleClear}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Results State Display */}
        {!searched && (
          <div className="text-center py-12 px-4 bg-white/50 rounded-2xl border border-dashed border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              🔍
            </div>
            <p className="text-sm font-semibold text-slate-600">Start Your Search</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Enter a candidate name or recommendation number above to display verified records.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-3">
            <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Searching official records...
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-base font-bold text-slate-800 mb-1">No Matching Records Found</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              No public recommendation record matches your search criteria. Please check the spelling or recommendation number.
            </p>
          </div>
        )}

        {searched && !loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Found {results.length} verified record{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((r) => (
              <PublicResultCard key={r.id} record={r} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
