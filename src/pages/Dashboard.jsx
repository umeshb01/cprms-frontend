import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'
import StatCard from '../components/StatCard'
import {
  getDashboardStats,
  getYearlyTrend,
  getProvinceDistribution,
} from '../services/dashboardService'

// Custom sleek tooltip for Recharts
function CustomTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700">
        <p className="text-slate-400 font-medium">{label}</p>
        <p className="text-indigo-400 text-sm font-bold">
          {payload[0].value} {unit || 'records'}
        </p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [yearlyTrend, setYearlyTrend] = useState([])
  const [provinceData, setProvinceData] = useState([])

  useEffect(() => {
    getDashboardStats().then(setStats)
    getYearlyTrend().then(setYearlyTrend)
    getProvinceDistribution().then(setProvinceData)
  }, [])

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
          <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading analytics dashboard…
        </div>
      </div>
    )
  }

  // Modern gradient colors for charts
  const provinceColors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#3b82f6', // Blue
    '#14b8a6', // Teal
  ]

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time analytics and recommendation distribution statistics
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          System Status: Operational
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Recommendations"
          value={stats.totalRecommendations}
          color="indigo"
          change="+14%"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Today's Entries"
          value={stats.todaysEntries}
          color="emerald"
          change="+2 new"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Pending Records"
          value={stats.pendingRecords}
          color="amber"
          change="Requires review"
          changeType="warning"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Trend Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Year-wise Recommendation Trend
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Historical growth across fiscal years</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
              BS Calendar
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip unit="recommendations" />} />
                <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Province Distribution Chart */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Province Distribution
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Candidate distribution by province</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
              7 Provinces
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={provinceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="province" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip unit="candidates" />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={28}>
                  {provinceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={provinceColors[index % provinceColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
