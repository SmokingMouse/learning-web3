"use client";

import { MiningSimulator } from "@/components/mining/MiningSimulator";

export default function MiningPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Mining Simulator</h1>
        <p className="text-sm text-[var(--muted)]">
          挖矿的本质是暴力搜索——不断尝试不同的 nonce 值，直到算出的哈希满足难度目标。
          这就是比特币的工作量证明（Proof of Work）机制。
        </p>
      </div>

      <MiningSimulator />
    </div>
  );
}
