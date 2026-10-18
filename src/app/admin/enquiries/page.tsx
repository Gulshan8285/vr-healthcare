"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Inbox,
  Search,
  Filter,
  FileSpreadsheet,
  Phone,
  MessageCircle,
  Eye,
  Check,
  Calendar,
  X,
  Loader2,
  Trash2,
  Save,
  Clock,
} from "lucide-react";

interface Enquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email: string | null;
  requiredService: string;
  message: string | null;
  preferredContactMethod: string | null;
  preferredTime: string | null;
  status: string;
  internalNotes: string | null;
  followUpDate: string | null;
  createdAt: string;
}

const STATUSES = [
  "New",
  "Contacted",
  "Follow-up Required",
  "In Discussion",
  "Converted",
  "Closed",
  "Spam",
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");

  // Selected enquiry for details view / modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editFollowUp, setEditFollowUp] = useState("");
  const [savingDetails, setSavingDetails] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
        status: statusFilter,
        service: serviceFilter,
        search,
      });

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to load enquiries", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, serviceFilter, search]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const openDetails = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.internalNotes || "");
    setEditFollowUp(enq.followUpDate ? enq.followUpDate.slice(0, 10) : "");
    setSaveSuccess(false);
  };

  const saveEnquiryChanges = async () => {
    if (!selectedEnquiry) return;
    setSavingDetails(true);

    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          internalNotes: editNotes,
          followUpDate: editFollowUp ? new Date(editFollowUp).toISOString() : null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSelectedEnquiry(data.enquiry);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingDetails(false);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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
    <div className="space-y-6">
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Care Enquiries Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Total records: {total} • Search, filter, update statuses and initiate calls/WhatsApp chats.
          </p>
        </div>
        <div>
          <a
            href={`/api/admin/enquiries/export?status=${statusFilter}&service=${serviceFilter}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-700" />
            <span>Export to CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name, phone, or reference number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
          >
            <option value="ALL">All Statuses</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Required Service</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-teal-600" />
                    <span>Loading enquiry records...</span>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>No enquiries found matching the criteria.</p>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => {
                  const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${enq.customerName}, this is regarding your enquiry (${enq.referenceNumber}) with VR Healthcare.`
                  )}`;
                  const telUrl = `tel:${enq.phone.replace(/[^0-9+]/g, "")}`;

                  return (
                    <tr
                      key={enq.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-teal-700">
                        {enq.referenceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{enq.customerName}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{enq.phone}</div>
                        {enq.email && (
                          <div className="text-slate-400 text-[10px]">{enq.email}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {enq.requiredService}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString()}
                        <div className="text-[10px] text-slate-400">
                          {new Date(enq.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                            enq.status
                          )}`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={telUrl}
                            title="Call customer"
                            className="p-1.5 text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp chat"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => openDetails(enq)}
                            type="button"
                            title="View / Edit details"
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>
              Page {page} of {totalPages} ({total} total entries)
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg font-medium"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail & Update Slide-over / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  Enquiry Reference
                </span>
                <div className="text-lg font-mono font-bold text-slate-900">
                  {selectedEnquiry.referenceNumber}
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm">
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Enquiry status and internal notes updated successfully!</span>
                </div>
              )}

              {/* Customer summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">Customer</span>
                  <span className="font-bold text-slate-900">{selectedEnquiry.customerName}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">Phone Number</span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEnquiry.phone}</span>
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">Email</span>
                  <span className="text-slate-700">{selectedEnquiry.email || "Not provided"}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">Preferred Contact</span>
                  <span className="text-slate-700 capitalize">
                    {selectedEnquiry.preferredContactMethod || "Phone"} ({selectedEnquiry.preferredTime || "Anytime"})
                  </span>
                </div>
              </div>

              {/* Service & Message */}
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Requested Service
                </span>
                <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 font-bold rounded-xl text-sm">
                  {selectedEnquiry.requiredService}
                </div>
              </div>

              {selectedEnquiry.message && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Customer Care Notes / Message
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 py-2 text-center text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.customerName}, this is regarding your enquiry (${selectedEnquiry.referenceNumber}) with VR Healthcare.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Status Update */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Update Enquiry Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Follow-up Scheduled Date
                </label>
                <input
                  type="date"
                  value={editFollowUp}
                  onChange={(e) => setEditFollowUp(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500"
                />
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Internal Administrative Notes (Not visible to customer)
                </label>
                <textarea
                  rows={3}
                  placeholder="Record call discussion, caregiver assigned, family requirements, or availability notes..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-500 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => deleteEnquiry(selectedEnquiry.id)}
                type="button"
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEnquiryChanges}
                  disabled={savingDetails}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
                >
                  {savingDetails ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Updates</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
