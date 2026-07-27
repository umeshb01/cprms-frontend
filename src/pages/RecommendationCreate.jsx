import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createRecommendation } from '../services/recommendationService'

// ─── Initial form state ────────────────────────────────────────────────────
// One object holds ALL field values. When you add more fields later,
// just add another key here — no extra useState calls needed.
const INITIAL_FORM = {
  recommendationNumber: '',
  candidateName: '',
  fatherName: '',
  service: '',
  position: '',
}

export default function RecommendationCreate() {
  const navigate = useNavigate()

  const [form, setForm]       = useState(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError]     = useState(null)

  // ─── handleChange pattern ──────────────────────────────────────────────
  // Every <input> carries a `name` attribute that matches a key in `form`.
  // Destructuring `name` and `value` from the event lets ONE function handle
  // ALL fields — just spread the previous state and overwrite the changed key.
  // When you add a new field, give it a matching `name` and it works automatically.
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // ─── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await createRecommendation(form)
      navigate('/recommendations')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/recommendations"
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Back to list"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">New Recommendation</h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Recommendation Number */}
            <div>
              <label htmlFor="recommendationNumber" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Recommendation Number
              </label>
              <input
                id="recommendationNumber"
                name="recommendationNumber"
                type="text"
                required
                placeholder="e.g. REC-2081-006"
                value={form.recommendationNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Candidate Name */}
            <div>
              <label htmlFor="candidateName" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Candidate Name
              </label>
              <input
                id="candidateName"
                name="candidateName"
                type="text"
                required
                placeholder="Full name"
                value={form.candidateName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label htmlFor="fatherName" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Father&apos;s Name
              </label>
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                placeholder="Father's full name"
                value={form.fatherName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Service
              </label>
              <input
                id="service"
                name="service"
                type="text"
                required
                placeholder="e.g. Nepal Administrative Service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Position
              </label>
              <input
                id="position"
                name="position"
                type="text"
                required
                placeholder="e.g. Under Secretary"
                value={form.position}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/recommendations"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition active:scale-95"
              >
                {isSubmitting ? 'Saving…' : 'Save Recommendation'}
              </button>
            </div>

          </form>
        </div>

        {/* Pattern explanation — remove this in production */}
        <details className="mt-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-slate-500">🧠 handleChange pattern — how it works</summary>
          <div className="mt-3 space-y-2 leading-relaxed">
            <p><strong>Single state object:</strong> <code>const [form, setForm] = useState(&#123; field1: '', field2: '' &#125;)</code> — all fields live in one object instead of one <code>useState</code> per field.</p>
            <p><strong>Computed key:</strong> <code>[name]: value</code> — square brackets let you use a variable as an object key. So when an input with <code>name="candidateName"</code> changes, it updates exactly <code>form.candidateName</code>.</p>
            <p><strong>Spread to preserve:</strong> <code>&#123; ...prev, [name]: value &#125;</code> — spread copies all existing fields first, then overwrites only the one that changed. Without the spread, you'd lose all other field values.</p>
            <p><strong>Adding a field later:</strong> Add a key to <code>INITIAL_FORM</code> and give the new <code>&lt;input&gt;</code> the matching <code>name</code>. The handler needs zero changes.</p>
          </div>
        </details>

      </div>
    </div>
  )
}
