import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRecommendations, deleteRecommendation } from '../services/recommendationService'

export default function RecommendationList() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ── loadData is a standalone function so both useEffect (initial load)
  //    and handleDelete (post-delete refresh) can call it without duplicating logic.
  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getRecommendations()
      setRecords(data)
    } catch (err) {
      setError(err.message || 'Failed to load recommendations.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, []) // runs once on mount

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return
    try {
      await deleteRecommendation(id)
      loadData() // refresh table after delete
    } catch (err) {
      alert(err.message || 'Delete failed.')
    }
  }

  // ── Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <svg className="animate-spin w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading recommendations…
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Recommendations</h1>
            <p className="text-sm text-slate-400 mt-0.5">All PSC recommendation records</p>
          </div>
          <Link
            to="/recommendations/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition active:scale-95"
          >
            <span className="text-lg leading-none">+</span> Add New
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            ⚠ {error}
          </div>
        )}

        {/* Empty state */}
        {!error && records.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <p className="text-lg font-medium">No recommendations yet.</p>
            <p className="text-sm mt-1">Click <strong>+ Add New</strong> to create the first record.</p>
          </div>
        )}

        {/* Table */}
        {records.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rec. Number</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r, index) => (
                  <tr key={r.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="px-5 py-4 text-slate-400 tabular-nums">{index + 1}</td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-indigo-600 font-medium">{r.recommendationNumber}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-800 font-medium">{r.candidateName}</td>
                    <td className="px-5 py-4 text-slate-600">{r.service}</td>
                    <td className="px-5 py-4 text-slate-600">{r.position}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/recommendations/${r.id}`)}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/recommendations/${r.id}/edit`)}
                          className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
              {records.length} record{records.length !== 1 ? 's' : ''} total
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
