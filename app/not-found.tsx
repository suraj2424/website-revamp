// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-dvh w-full bg-[#050505] overflow-hidden px-4">
      {/* Background gradient - static, no blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(210,255,0,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(210,255,0,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl animate-fade-in">
        {/* Logo */}
        <img
          src="/alcovia-logo.png"
          alt="Alcovia"
          width={120}
          height={40}
          className="h-8 md:h-10 w-auto brightness-0 invert opacity-80 mb-8 md:mb-12"
        />

        {/* 404 Number */}
        <h1 className="font-display font-black text-[clamp(5rem,20vw,12rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.4)] select-none mb-4">
          404
        </h1>

        {/* Text */}
        <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-wider mb-3">
          Off Track
        </h2>

        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="group px-6 py-3 md:px-8 md:py-3.5 bg-[#D2FF00] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:brightness-110 transition-all duration-200 flex items-center gap-2"
        >
          Return Home
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-[9px] text-white/20 uppercase tracking-widest">
        Error 404
      </p>
    </main>
  );
}