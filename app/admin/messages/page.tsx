"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Reply,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { ContactMessageItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const url = filter === "all" ? "/api/admin/messages" : `/api/admin/messages?filter=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (msg: ContactMessageItem) => {
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !msg.read }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, read: !msg.read });
      }
    } catch (e: any) {
      setError(e.message || "Failed to update");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete message");

      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (e: any) {
      setError(e.message || "Failed to delete message");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Contact Messages Inbox
          </h1>
          <p className="text-xs text-slate-400">
            Private visitor inquiries submitted through your public portfolio contact form.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-midnight-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filter === "all" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filter === "unread" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filter === "read" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages Layout (Master-Detail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Messages List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {messages.length === 0 ? (
            <div className="p-10 text-center rounded-2xl glass-card border border-dashed border-slate-800">
              <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No messages in this folder.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedMessage?.id === msg.id
                    ? "bg-sky-950/50 border-cyan-400"
                    : msg.read
                    ? "bg-midnight-950/60 border-slate-800/80 hover:border-slate-700"
                    : "bg-midnight-900 border-sky-800/60 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse"></span>
                    )}
                    <h3 className={`text-xs ${msg.read ? "font-medium text-slate-300" : "font-bold text-white"}`}>
                      {msg.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-sky-300/90 font-medium mt-1 truncate">
                  {msg.subject}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View (7 cols) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 rounded-2xl glass-card border border-sky-900/30 space-y-6 animate-fadeIn">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>From: <strong className="text-white">{selectedMessage.name}</strong></span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Received: {formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleReadStatus(selectedMessage)}
                    className="p-2 rounded-lg bg-midnight-950 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                    title={selectedMessage.read ? "Mark unread" : "Mark read"}
                  >
                    {selectedMessage.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 rounded-lg bg-midnight-950 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-xl bg-midnight-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed whitespace-pre-line min-h-[160px]">
                {selectedMessage.message}
              </div>

              {/* Reply Button */}
              <div className="flex justify-end">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-md shadow-sky-500/20 transition-all"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl glass-card border border-dashed border-slate-800 text-center">
              <Mail className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">No message selected</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Select an inquiry from the inbox on the left to read its details.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
