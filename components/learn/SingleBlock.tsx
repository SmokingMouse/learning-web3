"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sha256 } from "@/lib/crypto";

export function SingleBlock() {
  const [index] = useState(0);
  const [data, setData] = useState("Alice sends 1 BTC to Bob");
  const [prevHash] = useState("0".repeat(64));

  const hash = sha256(`${index}${prevHash}${data}${0}`);

  return (
    <div className="p-5 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] max-w-sm">
      <div className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--background)] inline-block mb-4">
        Block #0 (Genesis)
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-[var(--muted)] mb-1 block">Index</label>
          <div className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--foreground)]">
            0
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--muted)] mb-1 block">Data (try editing)</label>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-md p-2 text-sm resize-none h-14 focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div>
          <label className="text-xs text-[var(--muted)] mb-1 block">Previous Hash</label>
          <div className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--muted)]">
            {prevHash.slice(0, 20)}...
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--card-border)]">
          <label className="text-xs text-[var(--muted)] mb-1 block">
            Hash = SHA256(index + prevHash + data + nonce)
          </label>
          <AnimatePresence mode="wait">
            <motion.div
              key={hash}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--accent)]"
            >
              {hash}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
