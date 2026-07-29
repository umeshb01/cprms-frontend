import { createContext, useState } from 'react'
import en from '../translations/en.json'
import ne from '../translations/ne.json'

export const LanguageContext = createContext()

const translations = { en, ne }

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
