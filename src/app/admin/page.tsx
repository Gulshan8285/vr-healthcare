"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

interface DashboardStats {
  total: number;
  newCount: number;
  contactedCount: number;
  followUpCount: number;
  discussionCount: number;
  convertedCount: number;
  closedCount: number;
  spamCount: number;
  recentEnquiries: Array<{
    id: string;
    referenceNumber: string;
    customerName: string;
    phone: string;
    requiredService: string;
    status: string;
    createdAt: string;
  }>;
  serviceBreakdown: Array<{
    service: string;
    count: number;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Follow-up Required":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "In Discussion":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Closed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Spam":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Care Coordination Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of patient and family care enquiries across VR Healthcare.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>
          <a
            href="/api/admin/enquiries/export"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
            <Inbox className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats?.total ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            All-time customer requests
          </div>
        </div>

        {/* New & Action Required */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          <div className="text-3xl font-extrabold text-blue-800">
            {stats?.newCount ?? 0}
          </div>
          <div className="text-[11px] text-blue-600 mt-1">
            Awaiting first coordinator call
          </div>
        </div>

        {/* Follow-up Required */}
        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs">
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Follow-Up Needed</span>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-purple-800">
            {stats?.followUpCount ?? 0}
          </div>
          <div className="text-[11px] text-purple-600 mt-1">
            Pending discussion or availability
          </div>
        </div>

        {/* Converted */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Converted Care</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-800">
            {stats?.convertedCount ?? 0}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">
            Care arrangements placed
          </div>
        </div>
      </div>

      {/* Secondary Status Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Contacted</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{stats?.contactedCount ?? 0}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">In Discussion</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{stats?.discussionCount ?? 0}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Closed / Completed</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{stats?.closedCount ?? 0}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs text-slate-500">Spam Filtered</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{stats?.spamCount ?? 0}</div>
        </div>
      </div>

      {/* Recent Enquiries & Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Enquiries */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Customer Enquiries</h2>
              <p className="text-xs text-slate-500">Latest incoming requests from website forms</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {stats.recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{enq.customerName}</span>
                      <span className="font-mono text-xs text-slate-400">({enq.referenceNumber})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {enq.requiredService} • <span className="font-medium text-slate-700">{enq.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      {enq.status}
                    </span>
                    <Link
                      href={`/admin/enquiries?search=${encodeURIComponent(enq.referenceNumber)}`}
                      className="text-xs font-semibold text-teal-700 hover:underline"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No customer enquiries recorded yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Submissions via the homepage or contact forms will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Service Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Enquiries by Service</h2>
            <p className="text-xs text-slate-500">Distribution of family requests</p>
          </div>

          {stats?.serviceBreakdown && stats.serviceBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.serviceBreakdown.map((item) => (
                <div key={item.service} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="truncate pr-2">{item.service}</span>
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-bold">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Service enquiry breakdown will populate as requests are received.
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Quick Admin Shortcuts
            </h3>
            <div className="space-y-1.5 text-xs">
              <Link
                href="/admin/settings"
                className="block p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                &bull; Update Phone & WhatsApp Numbers
              </Link>
              <Link
                href="/admin/services"
                className="block p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                &bull; Edit Service Descriptions & Visibility
              </Link>
              <Link
                href="/admin/faqs"
                className="block p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                &bull; Manage FAQ Questions & Answers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
