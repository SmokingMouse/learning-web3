"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHash } from "@/hooks/useHash";

export function HashDemo() {
  const [input, setInput] = useState("Hello, blockchain!");
  const hash = useHash(input);

  return (
    <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
      <h3 className="text-sm font-medium text-[var(--muted)] mb-3">
        SHA-256 Hash Function
      </h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type anything..."
        className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-lg p-3 text-sm resize-none h-20 focus:outline-none focus:border-[var(--accent)]"
      />
      <div className="mt-3">
        <div className="text-xs text-[var(--muted)] mb-1">Hash output:</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={hash}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="font-hash p-3 rounded-lg bg-[var(--background)] text-[var(--accent)] border border-[var(--card-border)]"
          >
            {hash}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Try changing even a single character — the entire hash changes completely.
        This is the &quot;avalanche effect&quot;.
      </p>
    </div>
  );
}
