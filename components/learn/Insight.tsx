"use client";

import { Lightbulb, ArrowDown } from "lucide-react";

export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
      <div className="flex items-start gap-2">
        <Lightbulb size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-amber-200/80">{children}</div>
      </div>
    </div>
  );
}

export function Transition({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 flex flex-col items-center gap-3 text-center">
      <ArrowDown size={20} className="text-[var(--accent)] animate-bounce" />
      <p className="text-sm text-[var(--muted)] max-w-md">{children}</p>
    </div>
  );
}
