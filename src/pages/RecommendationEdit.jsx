import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getRecommendationById, updateRecommendation } from '../services/recommendationService'
import { COMMISSIONS, CATEGORIES, GENDERS, SERVICES, LEVELS } from '../utils/constants'

export default function RecommendationEdit() {
  // useParams() reads the dynamic segment from the URL.
  // Route: /recommendations/:id/edit → visiting /recommendations/3/edit → id = "3"
  const { id } = useParams()
  const navigate = useNavigate()

  // form starts as null — we can't render the inputs until the record is fetched.
  // Rendering while form is null would crash (can't read null.candidateName).
  const [form, setForm] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  // Fetch the record once when the component mounts (or when id changes).
  useEffect(() => {
    getRecommendationById(id)
      .then((data) => setForm(data))
      .catch((err) => setError(err.message || 'Record not found.'))
  }, [id])

  // Same handleChange pattern as Create — one function handles all fields.
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSaving(true)
    try {
      await updateRecommendation(id, form)
      navigate('/recommendations')
    } catch (err) {
      setError(err.message || 'Update failed. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // ── Guard: show loading until the record arrives
  if (!form && !error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <svg className="animate-spin w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading record…
        </div>
      </div>
    )
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition'
  const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/recommendations" className="text-slate-400 hover:text-slate-600 transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Edit Recommendation</h1>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            ⚠ {error}
          </div>
        )}

        {form && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Recommendation Number */}
              <div>
                <label htmlFor="recommendationNumber" className={labelClass}>Recommendation Number</label>
                <input id="recommendationNumber" name="recommendationNumber" value={form.recommendationNumber || ''} onChange={handleChange} className={inputClass} />
              </div>

              {/* Candidate Name */}
              <div>
                <label htmlFor="candidateName" className={labelClass}>Candidate Name</label>
                <input id="candidateName" name="candidateName" value={form.candidateName || ''} onChange={handleChange} className={inputClass} required />
              </div>

              {/* Father's Name */}
              <div>
                <label htmlFor="fatherName" className={labelClass}>Father&apos;s Name</label>
                <input id="fatherName" name="fatherName" value={form.fatherName || ''} onChange={handleChange} className={inputClass} />
              </div>

              {/* Mother's Name */}
              <div>
                <label htmlFor="motherName" className={labelClass}>Mother&apos;s Name</label>
                <input id="motherName" name="motherName" value={form.motherName || ''} onChange={handleChange} className={inputClass} />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className={labelClass}>Gender</label>
                <select id="gender" name="gender" value={form.gender || ''} onChange={handleChange} className={inputClass}>
                  <option value="">— Select —</option>
                  {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className={labelClass}>Service</label>
                <select id="service" name="service" value={form.service || ''} onChange={handleChange} className={inputClass}>
                  <option value="">— Select —</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Level */}
              <div>
                <label htmlFor="level" className={labelClass}>Level</label>
                <select id="level" name="level" value={form.level || ''} onChange={handleChange} className={inputClass}>
                  <option value="">— Select —</option>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className={labelClass}>Position</label>
                <input id="position" name="position" value={form.position || ''} onChange={handleChange} className={inputClass} required />
              </div>

              {/* Commission */}
              <div>
                <label htmlFor="commission" className={labelClass}>Commission</label>
                <select id="commission" name="commission" value={form.commission || ''} onChange={handleChange} className={inputClass}>
                  <option value="">— Select —</option>
                  {COMMISSIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <select id="category" name="category" value={form.category || ''} onChange={handleChange} className={inputClass}>
                  <option value="">— Select —</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Recommendation Date */}
              <div>
                <label htmlFor="recommendationDate" className={labelClass}>Recommendation Date</label>
                <input id="recommendationDate" name="recommendationDate" type="text" placeholder="YYYY-MM-DD" value={form.recommendationDate || ''} onChange={handleChange} className={inputClass} />
              </div>

              {/* Fiscal Year */}
              <div>
                <label htmlFor="fiscalYear" className={labelClass}>Fiscal Year</label>
                <input id="fiscalYear" name="fiscalYear" placeholder="e.g. 2080/081" value={form.fiscalYear || ''} onChange={handleChange} className={inputClass} />
              </div>

              {/* Remarks — full width */}
              <div className="sm:col-span-2">
                <label htmlFor="remarks" className={labelClass}>Remarks</label>
                <textarea id="remarks" name="remarks" rows={3} value={form.remarks || ''} onChange={handleChange} className={inputClass + ' resize-none'} />
              </div>

              {/* Actions */}
              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                <Link to="/recommendations" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition active:scale-95"
                >
                  {isSaving ? 'Saving…' : 'Update Recommendation'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  )
}
