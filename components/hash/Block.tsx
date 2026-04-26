"use client";

import { motion } from "framer-motion";
import { BlockData } from "@/hooks/useBlockchain";

interface BlockProps {
  block: BlockData;
  onDataChange: (index: number, data: string) => void;
}

export function Block({ block, onDataChange }: BlockProps) {
  const isValid = block.hash === block.originalHash;

  return (
    <motion.div
      animate={
        isValid ? {} : { x: [-2, 2, -2, 2, 0] }
      }
      transition={{ duration: 0.3 }}
      className={`flex-shrink-0 w-72 p-4 rounded-xl border-2 transition-colors ${
        isValid
          ? "border-[var(--valid)] bg-[var(--card)]"
          : "border-[var(--invalid)] bg-red-950/20"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)]">
          Block #{block.index}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            isValid
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isValid ? "Valid" : "Invalid"}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-xs text-[var(--muted)]">Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(block.index, e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-md p-2 text-xs resize-none h-14 focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div>
          <label className="text-xs text-[var(--muted)]">Prev Hash</label>
          <div className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--muted)] truncate">
            {block.prevHash.slice(0, 16)}...
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--muted)]">Hash</label>
          <div
            className={`font-hash p-2 rounded-md bg-[var(--background)] truncate ${
              isValid ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {block.hash.slice(0, 16)}...
          </div>
        </div>
      </div>
    </motion.div>
  );
}
