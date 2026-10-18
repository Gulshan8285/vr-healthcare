"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  Briefcase,
  HelpCircle,
  KeyRound,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import Logo from "@/components/Logo";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // If on login page, just show the login screen
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading spinner while verifying session
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400 mb-3" />
        <p className="text-sm text-slate-400">Verifying administrator session...</p>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Website Content", href: "/admin/settings", icon: Settings },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Security & Password", href: "/admin/password", icon: KeyRound },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Logo light showTagline={false} />
          <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          type="button"
          className="p-2 text-slate-300 hover:text-white"
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile overlay */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-slate-900 text-slate-200 flex flex-col justify-between z-50 transition-transform duration-200 ease-in-out border-r border-slate-800 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <Logo light showTagline={false} />
              <div className="text-[11px] font-semibold text-teal-400 mt-1 uppercase tracking-wider">
                Management Console
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with user profile and quick actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="px-3 py-2 bg-slate-800/70 rounded-xl text-xs">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Logged In As</div>
            <div className="text-white font-semibold truncate mt-0.5">{user?.name || "Administrator"}</div>
            <div className="text-slate-400 text-[11px] truncate">{user?.email}</div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-teal-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              VR Healthcare Admin
            </span>
            <div className="text-sm font-bold text-slate-800">
              {pathname === "/admin" && "Executive Overview"}
              {pathname === "/admin/enquiries" && "Care Enquiries Management"}
              {pathname === "/admin/settings" && "Website Content & Contact Information"}
              {pathname === "/admin/services" && "Services Configuration"}
              {pathname === "/admin/faqs" && "FAQ Manager"}
              {pathname === "/admin/password" && "Administrator Account Security"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
