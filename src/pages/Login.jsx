import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    heading: 'CPRMS',
    subheading: 'Recommendation management system',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    loginButton: 'Sign In',
    loggingIn: 'Signing in...',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    successMsg: 'Login successful! Redirecting...',
  },
  ne: {
    heading: 'CPRMS',
    subheading: 'सिफारिस व्यवस्थापन प्रणाली',
    emailLabel: 'इमेल ठेगाना',
    emailPlaceholder: 'name@example.com',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: '••••••••',
    loginButton: 'साइन इन गर्नुहोस्',
    loggingIn: 'साइन इन हुँदैछ...',
    forgotPassword: 'पासवर्ड बिर्सनुभयो?',
    rememberMe: 'मलाई सम्झनुहोस्',
    emailRequired: 'इमेल आवश्यक छ',
    invalidEmail: 'कृपया सही इमेल ठेगाना राख्नुहोस्',
    passwordRequired: 'पासवर्ड आवश्यक छ',
    successMsg: 'लगइन सफल भयो! रिडिरेक्ट हुँदैछ...',
  }
}

export default function Login() {
  const navigate = useNavigate()
  const [lang, setLang] = useState('en')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const t = translations[lang]

  const validate = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = t.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.invalidEmail
    }
    if (!password) {
      newErrors.password = t.passwordRequired
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false)
      setLoginSuccess(true)
      // Navigate to dashboard after showing success
      setTimeout(() => navigate('/dashboard'), 800)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center p-4">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden transition-all duration-300">

      <div className="flex flex-col items-center mb-8">
        {/* Modern SVG logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/20 hover:scale-105 hover:rotate-6 transition-all duration-300 mb-4 cursor-pointer group">
          <svg className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 mb-1.5">
          {t.heading}
        </h1>

        {/* Paragraph Description */}
        <p className="text-sm font-medium text-gray-400 text-center px-4">
          {t.subheading}
        </p>
      </div>

      {loginSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-emerald-600">
            {t.successMsg}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t.emailLabel}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                }}
                placeholder={t.emailPlaceholder}
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email ? 'border-red-400 focus:ring-red-300/40' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-300/30'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 font-medium animate-pulse flex items-center space-x-1">
                <span>⚠</span> <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password input field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.passwordLabel}
              </label>
              <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                {t.forgotPassword}
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
                }}
                placeholder={t.passwordPlaceholder}
                className={`w-full pl-11 pr-11 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password ? 'border-red-400 focus:ring-red-300/40' : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-300/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400 font-medium animate-pulse flex items-center space-x-1">
                <span>⚠</span> <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Remember me option */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400/30 accent-indigo-500 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2.5 text-xs font-semibold text-gray-500 select-none cursor-pointer">
              {t.rememberMe}
            </label>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t.loggingIn}</span>
              </>
            ) : (
              <span>{t.loginButton}</span>
            )}
          </button>
        </form>
      )}

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-white px-3 py-0.5 rounded-full border border-gray-200">
          Language
        </div>
      </div>

      {/* Language Switch */}
      <div className="flex justify-center space-x-2">
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg tracking-wider transition-all duration-200 cursor-pointer ${
            lang === 'en'
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm'
              : 'text-gray-400 border border-transparent hover:text-gray-600'
          }`}
        >
          EN
        </button>
        <div className="w-[1px] bg-gray-200 my-1.5"></div>
        <button
          type="button"
          onClick={() => setLang('ne')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            lang === 'ne'
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm'
              : 'text-gray-400 border border-transparent hover:text-gray-600'
          }`}
        >
          नेपाली
        </button>
      </div>
    </div>
    </div>
  )
}
