import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          CPRMS — Recommendation Management System
        </div>

        {/* Heading */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
          Coming{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Soon
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-lg sm:text-xl font-medium mb-10 leading-relaxed">
          We&apos;re crafting something extraordinary.<br />
          The full platform will be live shortly.
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-indigo-500/60 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-all duration-200 active:scale-95"
          >
            Go to Login
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            View Dashboard
          </Link>
        </div>

      </div>
    </div>
  )
}
