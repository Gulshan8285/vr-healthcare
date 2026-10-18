import Link from "next/link";

interface LogoProps {
  className?: string;
  light?: boolean;
  showTagline?: boolean;
}

export default function Logo({ className = "", light = false, showTagline = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 rounded-full select-none ${className}`}
    >
      {/* Classy Circular Medical Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 text-white shadow-md shadow-teal-500/25 ring-2 ring-white/80 group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-5.5 sm:h-5.5"
        >
          {/* Medical Cross in circle */}
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight leading-tight transition-colors ${
            light ? "text-white" : "text-slate-900 group-hover:text-teal-700"
          }`}
        >
          VR <span className="text-teal-600 font-extrabold">Healthcare</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9.5px] sm:text-[10px] uppercase font-bold tracking-widest ${
              light ? "text-slate-300/90" : "text-slate-500"
            }`}
          >
            Home &amp; Patient Care
          </span>
        )}
      </div>
    </Link>
  );
}
