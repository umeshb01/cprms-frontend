import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

/**
 * Custom React hook to access LanguageContext.
 *
 * @returns {{ language: string, changeLanguage: Function, t: Function }}
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
