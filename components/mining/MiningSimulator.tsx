"use client";

import { motion } from "framer-motion";
import { useMining } from "@/hooks/useMining";
import { DIFFICULTY_LEVELS } from "@/lib/constants";
import { Play, Square } from "lucide-react";

function HashDisplay({ hash, difficulty }: { hash: string; difficulty: number }) {
  const prefix = hash.slice(0, difficulty);
  const rest = hash.slice(difficulty);
  const valid = prefix === "0".repeat(difficulty);

  return (
    <div className="font-hash p-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)]">
      <span className={valid ? "text-emerald-400" : "text-red-400"}>
        {prefix}
      </span>
      <span className="text-[var(--muted)]">{rest}</span>
    </div>
  );
}

export function MiningSimulator() {
  const {
    data,
    setData,
    nonce,
    setNonce,
    difficulty,
    setDifficulty,
    hash,
    isMining,
    attempts,
    found,
    startMining,
    stopMining,
  } = useMining();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        <h3 className="text-sm font-medium text-[var(--muted)] mb-4">
          Block Data
        </h3>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={isMining}
          className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-lg p-3 text-sm resize-none h-16 focus:outline-none focus:border-[var(--accent)] disabled:opacity-50"
        />

        <div className="mt-4">
          <label className="text-sm text-[var(--muted)]">Difficulty</label>
          <div className="flex gap-2 mt-2">
            {DIFFICULTY_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => setDifficulty(level.value)}
                disabled={isMining}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors disabled:opacity-50 ${
                  difficulty === level.value
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[var(--muted)]">
            Mining
          </h3>
          <div className="flex items-center gap-2">
            {!isMining ? (
              <button
                onClick={startMining}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
              >
                <Play size={14} />
                Start Mining
              </button>
            ) : (
              <button
                onClick={stopMining}
                className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--invalid)] text-white hover:opacity-90 transition-opacity"
              >
                <Square size={14} />
                Stop
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-[var(--muted)]">Nonce (manual)</label>
              <span className="font-hash text-[var(--accent)]">{nonce.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100000}
              value={Math.min(nonce, 100000)}
              onChange={(e) => setNonce(parseInt(e.target.value))}
              disabled={isMining}
              className="w-full accent-[var(--accent)] disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--muted)] mb-1 block">
              Hash — needs {difficulty} leading zero{difficulty > 1 ? "s" : ""}
            </label>
            <HashDisplay hash={hash} difficulty={difficulty} />
          </div>

          <div className="flex gap-6 text-xs text-[var(--muted)]">
            <div>
              Attempts: <span className="text-[var(--foreground)]">{attempts.toLocaleString()}</span>
            </div>
            {found && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-emerald-400 font-semibold"
              >
                Block mined!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--muted)] leading-relaxed">
        Miners repeatedly try different nonce values until they find a hash that
        starts with enough zeros. Higher difficulty = more zeros needed = exponentially
        more attempts. This is Proof of Work.
      </p>
    </div>
  );
}
