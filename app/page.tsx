import Link from "next/link";
import { ModuleCard } from "@/components/layout/ModuleCard";
import { GraduationCap, Blocks, Pickaxe, KeyRound } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Bitcoin, from First Principles
        </h1>
        <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
          从「两个陌生人怎么转账」这个朴素问题出发，
          一步步推出 BTC 的全部设计。
          每一个零件，都是被上一步的问题逼出来的。
        </p>
      </div>

      {/* CTA: Guided Learning */}
      <div className="text-center">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          <GraduationCap size={20} />
          从双花问题出发 — 9 节推演
        </Link>
        <p className="text-xs text-[var(--muted)] mt-2">
          主线读完 ≈ 15 分钟 · 深挖细节点开 Deeper 折叠区
        </p>
      </div>

      {/* Sandbox modules */}
      <div>
        <h2 className="text-sm text-[var(--muted)] mb-3 text-center">
          Or jump to a specific topic:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModuleCard
            href="/hash"
            title="Hash & Chain"
            description="体验哈希函数的雪崩效应，理解区块链为什么不可篡改。"
            icon={Blocks}
          />
          <ModuleCard
            href="/mining"
            title="Mining"
            description="亲手挖一个区块。调整 nonce 寻找满足难度目标的哈希值。"
            icon={Pickaxe}
          />
          <ModuleCard
            href="/signature"
            title="Signature"
            description="生成密钥对，签署交易，验证签名。"
            icon={KeyRound}
          />
        </div>
      </div>
    </div>
  );
}
