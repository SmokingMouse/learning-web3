"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";

interface DeeperProps {
  title: string;
  children: React.ReactNode;
}

export function Deeper({ title, children }: DeeperProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)]/40 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-[var(--card)] transition-colors"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="text-[var(--muted)] flex-shrink-0"
        >
          <ChevronRight size={14} />
        </motion.span>
        <Plus size={12} className="text-[var(--accent)] flex-shrink-0" />
        <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
          Deeper
        </span>
        <span className="text-xs text-[var(--foreground)] ml-1">{title}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-sm text-[var(--muted)] leading-relaxed space-y-2 border-t border-[var(--card-border)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
