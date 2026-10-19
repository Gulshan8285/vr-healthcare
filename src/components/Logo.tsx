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
      className={`inline-flex items-center gap-3 group outline-none select-none ${className}`}
    >
      {/* Modern Medical Care Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white shadow-md shadow-teal-700/20 border border-teal-400/30 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
        >
          {/* Subtle Heart Silhouette */}
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-45"
          />
          {/* Clean Rounded Medical Cross */}
          <path
            d="M12 7.5v7M8.5 11h7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
              light ? "text-white" : "text-slate-900 group-hover:text-teal-700"
            } transition-colors`}
          >
            VR
          </span>
          <span className="text-lg sm:text-xl font-bold tracking-tight leading-none text-teal-600">
            Healthcare
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9.5px] uppercase font-bold tracking-widest mt-1 ${
              light ? "text-teal-300/80" : "text-slate-400"
            }`}
          >
            Home &amp; Patient Care
          </span>
        )}
      </div>
    </Link>
  );
}
