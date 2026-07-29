import { useState, useEffect } from 'react'
import { getReportData } from '../services/recommendationService'
import { exportToCSV } from '../utils/exportHelpers'

const REPORT_TYPES = [
  { value: 'commission', label: 'Commission-wise Report', description: 'Breakdown of recommendations by recommending commission body' },
  { value: 'service', label: 'Service-wise Report', description: 'Breakdown of candidate recommendations across civil service branches' },
  { value: 'category', label: 'Category-wise Report', description: 'Breakdown by inclusive quotas and open competition seats' },
  { value: 'gender', label: 'Gender-wise Report', description: 'Demographic breakdown by gender representation' },
]

export default function Reports() {
  const [reportType, setReportType] = useState('commission')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getReportData(reportType).then((result) => {
      if (!cancelled) {
        setData(result)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [reportType])

  const totalCount = data.reduce((acc, row) => acc + row.count, 0)
  const selectedReportInfo = REPORT_TYPES.find((r) => r.value === reportType)

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            System Reports & Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate aggregated summary reports and export statistical data
          </p>
        </div>

        {/* CSV Export Button */}
        <button
          onClick={() => exportToCSV(data, `cprms-${reportType}-report.csv`)}
          disabled={loading || data.length === 0}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition active:scale-95 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Control Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition text-sm shadow-sm"
          >
            {REPORT_TYPES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">{selectedReportInfo?.description}</p>
        </div>

        {/* Quick total counter badge */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl px-5 py-3 flex items-center gap-4">
          <div>
            <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider">Total Evaluated</p>
            <p className="text-2xl font-extrabold text-indigo-900">{totalCount} Records</p>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 text-sm gap-3">
            <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating report data...
          </div>
        ) : (
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category / Field
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Distribution & Visual
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-12 text-center text-slate-400">
                      No report data available.
                    </td>
                  </tr>
                ) : (
                  data.map((row) => {
                    const percentage = totalCount > 0 ? Math.round((row.count / totalCount) * 100) : 0
                    return (
                      <tr key={row.label} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800">{row.label}</td>
                        <td className="px-5 py-4 w-1/2">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-500 w-10 text-right">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="font-mono text-indigo-600 font-bold px-2.5 py-1 bg-indigo-50 rounded-lg">
                            {row.count}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
              <span>Report Generated: {selectedReportInfo?.label}</span>
              <span>{data.length} categories summarized</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
