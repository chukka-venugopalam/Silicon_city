"use client";

export default function OsSimulator() {
  const processes = [
    { id: "P1", burst: 3, color: "bg-sky-500" },
    { id: "P2", burst: 4, color: "bg-cyan-500" },
    { id: "P3", burst: 7, color: "bg-indigo-500" },
    { id: "P4", burst: 2, color: "bg-slate-500" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">FCFS Gantt Chart</p>
          <p className="mt-1 text-sm text-slate-600">Processes are scheduled in arrival order; P3 causes the convoy effect.</p>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 border border-slate-200">
          Non-preemptive
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          <div className="grid grid-cols-[4rem_1fr] gap-4 text-sm font-semibold text-slate-600">
            <span>Order</span>
            <span>Process</span>
          </div>
          {processes.map((process, index) => (
            <div key={process.id} className="grid grid-cols-[4rem_1fr] items-center gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-slate-700">{index + 1}</span>
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${process.color}`}>
                  {process.id}
                </div>
                <p className="text-sm text-slate-500">Burst time: {process.burst}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-auto rounded-3xl border border-slate-200 bg-white p-4">
          <div className="flex items-end gap-2 text-xs text-slate-500">
            {processes.map((process) => (
              <div key={process.id} className="flex-1 text-center">{process.id}</div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {processes.map((process) => (
              <div
                key={process.id}
                className={`${process.color} rounded-2xl text-white text-sm font-semibold flex items-center justify-center shadow-sm`}
                style={{ width: `${process.burst * 4}rem`, minWidth: "4rem", minHeight: "3rem" }}
              >
                {process.id}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-12 gap-2 text-[11px] text-slate-500">
            {Array.from({ length: processes.reduce((sum, p) => sum + p.burst, 0) + 1 }, (_, i) => (
              <div key={i} className="flex items-center justify-center border-r border-slate-200 last:border-none px-1">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
