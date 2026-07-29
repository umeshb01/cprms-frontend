export default function PublicResultCard({ record }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 print:shadow-none print:border-slate-300 print:rounded-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
            {record.recommendationNumber}
          </span>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{record.candidateName}</h3>
        </div>

        <span className="self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/80">
          {record.category || 'Open Competition'}
        </span>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-5">
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Commission</p>
          <p className="font-semibold text-slate-700">{record.commission || 'N/A'}</p>
        </div>

        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Service</p>
          <p className="font-semibold text-slate-700">{record.service || 'N/A'}</p>
        </div>

        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Position</p>
          <p className="font-semibold text-slate-700">{record.position || 'N/A'}</p>
        </div>

        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Recommendation Date</p>
          <p className="font-semibold text-slate-700">{record.recommendationDate || 'N/A'}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-1 print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/80 px-3.5 py-2 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Record
        </button>
      </div>
    </div>
  )
}
