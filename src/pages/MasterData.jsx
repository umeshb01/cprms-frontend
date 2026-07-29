import { useState, useEffect } from 'react'
import {
  getMasterData,
  addMasterDataItem,
  deleteMasterDataItem,
} from '../services/masterDataService'

// TODO: Restrict access to Admin role once backend role-based access control (RBAC) is implemented.

const TABS = [
  { id: 'commissions', label: 'Commissions', singular: 'commission' },
  { id: 'services', label: 'Services', singular: 'service' },
  { id: 'categories', label: 'Categories', singular: 'category' },
]

export default function MasterData() {
  const [activeTab, setActiveTab] = useState('commissions')
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const activeTabMeta = TABS.find((t) => t.id === activeTab) || TABS[0]

  // Re-fetch data whenever activeTab changes
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getMasterData(activeTab)
      .then((data) => {
        if (!cancelled) {
          setItems(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load master data.')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [activeTab])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newItem.trim()) return

    setIsSubmitting(true)
    setError(null)
    try {
      const updated = await addMasterDataItem(activeTab, newItem)
      setItems(updated)
      setNewItem('')
    } catch (err) {
      setError(err.message || 'Failed to add item.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (value) => {
    if (!window.confirm(`Are you sure you want to delete "${value}"?`)) return

    setError(null)
    try {
      const updated = await deleteMasterDataItem(activeTab, value)
      setItems(updated)
    } catch (err) {
      setError(err.message || 'Failed to delete item.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
          Master Data Management
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage system lookup values for commissions, civil services, and candidate categories
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs Navigation Header */}
        <div className="flex border-b border-slate-200 px-6 pt-4 space-x-6 bg-slate-50/50">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setNewItem('')
                }}
                className={`pb-3.5 text-sm transition-colors relative font-medium ${
                  isActive
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold'
                    : 'text-gray-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="p-6 space-y-6">
          {/* Error Banner */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center justify-between">
              <span>⚠ {error}</span>
              <button onClick={() => setError(null)} className="text-xs font-semibold text-red-500 underline">
                Dismiss
              </button>
            </div>
          )}

          {/* Add New Item Form */}
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Add new ${activeTabMeta.singular}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition text-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newItem.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition active:scale-95 shadow-xs"
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </form>

          {/* Items List */}
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400 text-sm gap-3">
              <svg className="animate-spin w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading {activeTabMeta.label.toLowerCase()}...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl">
              <p className="text-sm font-medium">No {activeTabMeta.label.toLowerCase()} found.</p>
              <p className="text-xs mt-0.5">Use the form above to add the first item.</p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex justify-between items-center border border-slate-200/80 p-3.5 rounded-xl bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-800">{item}</span>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-xs font-semibold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Footer stats */}
          {!loading && (
            <div className="pt-2 text-xs text-slate-400 border-t border-slate-100 flex justify-between items-center">
              <span>{items.length} {activeTabMeta.label.toLowerCase()} total</span>
              <span className="text-slate-400">Master Data Lookup</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
