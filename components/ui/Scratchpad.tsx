"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "silicon-city-scratchpad-notes";

export default function Scratchpad() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setNotes(saved);
    }
  }, []);

  useEffect(() => {
    if (open) {
      window.localStorage.setItem(STORAGE_KEY, notes);
    }
  }, [notes, open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open Scratchpad"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-2xl shadow-cyan-500/30 transition hover:bg-cyan-400"
      >
        ✍️
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm px-4 pb-6 sm:items-center sm:px-6">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Scratchpad</h2>
                <p className="text-sm text-slate-500">Notes persist locally and stay ready for your next review.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[280px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              placeholder="Keep formulas, pointer layout ideas, and GATE shortcuts here..."
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
