"use client";

import { Check, ArrowDown, HelpCircle } from "lucide-react";

interface BridgeQuestionProps {
  solved: string;
  remaining: string;
}

export function BridgeQuestion({ solved, remaining }: BridgeQuestionProps) {
  return (
    <div className="my-10 mx-auto max-w-lg">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)]/60 overflow-hidden">
        <div className="flex items-start gap-3 p-4 border-b border-[var(--card-border)]">
          <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--valid)]/15 flex items-center justify-center">
            <Check size={12} className="text-[var(--valid)]" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">
              上一节解决了
            </div>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              {solved}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-[var(--accent)]/5">
          <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
            <HelpCircle size={12} className="text-[var(--accent)]" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] mb-1">
              但留下了新问题
            </div>
            <p className="text-sm text-[var(--foreground)] leading-relaxed font-medium">
              {remaining}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <ArrowDown size={16} className="text-[var(--accent)] animate-bounce" />
      </div>
    </div>
  );
}
