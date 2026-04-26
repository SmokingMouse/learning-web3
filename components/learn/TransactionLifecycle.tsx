"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  PenTool,
  Radio,
  Pickaxe,
  Blocks,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  {
    icon: KeyRound,
    label: "Generate Keys",
    desc: "Alice 用椭圆曲线密码学生成密钥对。私钥只有她知道，公钥公开。",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: PenTool,
    label: "Sign Transaction",
    desc: "Alice 构造交易「Send 1 BTC to Bob」，用私钥签名。签名证明这笔交易确实是她发起的。",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Radio,
    label: "Broadcast",
    desc: "签名后的交易广播到 P2P 网络，进入 mempool（待处理交易池）等待被矿工打包。",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Pickaxe,
    label: "Mining (PoW)",
    desc: "矿工从 mempool 选取交易打包成区块，不断尝试 nonce 直到找到满足难度目标的哈希。",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Blocks,
    label: "Add to Chain",
    desc: "新区块链接到链上。区块的 prevHash 指向前一个区块，形成不可篡改的链式结构。",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: ShieldCheck,
    label: "Verified",
    desc: "其他节点验证：签名有效？哈希满足难度？交易合法？全部通过后，这笔交易被全网确认。",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

export function TransactionLifecycle() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => setActiveStep(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                i === activeStep
                  ? `${step.bg} ${step.color} ring-1 ring-current`
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <step.icon size={14} />
              {step.label}
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`w-4 h-px mx-1 ${
                  i < activeStep ? "bg-[var(--valid)]" : "bg-[var(--card-border)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Detail card */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)]`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${STEPS[activeStep].bg}`}>
            {(() => {
              const Icon = STEPS[activeStep].icon;
              return <Icon size={20} className={STEPS[activeStep].color} />;
            })()}
          </div>
          <h3 className={`font-semibold ${STEPS[activeStep].color}`}>
            {STEPS[activeStep].label}
          </h3>
        </div>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {STEPS[activeStep].desc}
        </p>
        <div className="mt-4 text-xs text-[var(--muted)]">
          This step uses:{" "}
          {activeStep <= 1 && <span className="text-purple-400">Digital Signature (Step 5)</span>}
          {activeStep === 2 && <span className="text-cyan-400">P2P Network</span>}
          {activeStep === 3 && <span className="text-amber-400">Proof of Work (Step 4)</span>}
          {activeStep === 4 && <span className="text-emerald-400">Hash Chain (Steps 1-3)</span>}
          {activeStep === 5 && <span className="text-green-400">All of the above</span>}
        </div>
      </motion.div>

      <p className="text-xs text-[var(--muted)] text-center">
        Click each step to see how the concepts you learned come together.
      </p>
    </div>
  );
}
