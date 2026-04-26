"use client";

import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="relative rounded-xl border border-dashed border-[var(--accent)]/40 bg-[var(--card)]/30 p-5">
      <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
        <Sparkles size={10} />
        Phase 2
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
          <Sparkles size={18} className="text-[var(--accent)]" />
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-sm font-semibold text-[var(--foreground)] mb-1">
            交互可视化：{title}
          </div>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
