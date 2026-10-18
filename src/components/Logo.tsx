import Link from "next/link";

interface LogoProps {
  className?: string;
  light?: boolean;
  showTagline?: boolean;
}

export default function Logo({ className = "", light = false, showTagline = true }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 ${className}`}>
      {/* Medical Cross / Shield Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          {/* Gentle Heart Shield + Cross Motif */}
          <path d="M12 4v16m-8-8h16" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.75" className="opacity-40" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`text-xl font-bold tracking-tight leading-tight transition-colors ${
          light ? "text-white" : "text-slate-900 group-hover:text-teal-700"
        }`}>
          VR <span className="text-teal-600 font-extrabold">Healthcare</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] uppercase font-semibold tracking-wider ${
            light ? "text-slate-300" : "text-slate-500"
          }`}>
            Home & Patient Care
          </span>
        )}
      </div>
    </Link>
  );
}
