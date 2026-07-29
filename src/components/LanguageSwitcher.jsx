import { useLanguage } from '../hooks/useLanguage'

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-gray-800/80 p-1 rounded-lg border border-gray-700/60">
      <button
        onClick={() => changeLanguage('en')}
        className={`flex-1 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
          language === 'en'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ne')}
        className={`flex-1 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
          language === 'ne'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        नेपाली
      </button>
    </div>
  )
}
