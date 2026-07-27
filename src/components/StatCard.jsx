export default function StatCard({ label, value, icon, change, changeType = 'positive', color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-500/10 to-indigo-500/5 text-indigo-600 border-indigo-100',
    emerald: 'from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-100',
    amber: 'from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-100',
    purple: 'from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-100',
  }

  const iconBgMap = {
    indigo: 'bg-indigo-500/10 text-indigo-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
    purple: 'bg-purple-500/10 text-purple-600',
  }

  const themeClass = colorMap[color] || colorMap.indigo
  const iconBgClass = iconBgMap[color] || iconBgMap.indigo

  return (
    <div className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Decorative top accent glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${themeClass} rounded-full blur-2xl pointer-events-none transition-transform group-hover:scale-110`} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
          
          {change && (
            <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
              <span className={changeType === 'positive' ? 'text-emerald-600' : 'text-amber-600'}>
                {change}
              </span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass} shadow-inner transition-transform group-hover:scale-110`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
