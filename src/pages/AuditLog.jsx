import { useState, useEffect } from 'react'
import { getAuditLogs } from '../services/auditLogService'
import { usePagination } from '../hooks/usePagination'

const ACTIVITIES = [
  'Login',
  'Record Created',
  'Record Updated',
  'Record Deleted',
  'Document Uploaded',
]

export default function AuditLog() {
  const [logs, setLogs] = useState([])
  const [activityFilter, setActivityFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const { paginatedItems, currentPage, setCurrentPage, totalPages } = usePagination(logs, 5)

  // Re-fetch audit logs whenever activityFilter changes
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getAuditLogs({ activity: activityFilter }).then((data) => {
      if (!cancelled) {
        setLogs(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [activityFilter])

  // Badge styling helper for different activity types
  const getActivityBadgeClass = (activity) => {
    switch (activity) {
      case 'Login':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Record Created':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Record Updated':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
      case 'Record Deleted':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'Document Uploaded':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            Audit Logs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable, read-only system security trail and activity monitor
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/70 border border-slate-300/60 text-slate-700 text-xs font-semibold self-start sm:self-auto">
          🔒 Read-Only Trail
        </div>
      </div>

      {/* Filter Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="activityFilter" className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            Filter Activity:
          </label>
          <select
            id="activityFilter"
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition text-sm shadow-xs"
          >
            <option value="">All Activities</option>
            {ACTIVITIES.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>

        {activityFilter && (
          <button
            onClick={() => setActivityFilter('')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition self-start sm:self-auto"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Table & Content */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 text-sm gap-3">
            <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </div>
        ) : (
          <div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Office</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                      No matching audit log entries found.
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((log) => (
                    <tr key={log.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-5 py-4 text-slate-600 font-mono text-xs">{log.date}</td>
                      <td className="px-5 py-4 text-slate-600 font-mono text-xs">{log.time}</td>
                      <td className="px-5 py-4 text-slate-800 font-medium">{log.user}</td>
                      <td className="px-5 py-4 text-slate-600">{log.office}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md border ${getActivityBadgeClass(log.activity)}`}>
                          {log.activity}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">{log.ipAddress}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {logs.length > 0 && (
              <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Showing {Math.min((currentPage - 1) * 5 + 1, logs.length)} to {Math.min(currentPage * 5, logs.length)} of {logs.length} entries
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-slate-50 transition"
                  >
                    Previous
                  </button>

                  <span className="font-medium text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-slate-50 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
