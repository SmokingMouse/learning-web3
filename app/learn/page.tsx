"use client";

import { Section } from "@/components/learn/Section";
import { BridgeQuestion } from "@/components/learn/BridgeQuestion";
import { Section0 } from "@/components/learn/sections/Section0";
import { Section1 } from "@/components/learn/sections/Section1";
import { Section2 } from "@/components/learn/sections/Section2";
import { Section3 } from "@/components/learn/sections/Section3";
import { Section4 } from "@/components/learn/sections/Section4";
import { Section5 } from "@/components/learn/sections/Section5";
import { Section6 } from "@/components/learn/sections/Section6";
import { Section7 } from "@/components/learn/sections/Section7";
import { Section8 } from "@/components/learn/sections/Section8";

const STEPS = [
  "Why",
  "Ledger",
  "Hash",
  "PoW",
  "Sig",
  "UTXO",
  "Merkle",
  "Supply",
  "Journey",
];

const SECTION_META = [
  {
    title: "为什么需要 BTC？",
    subtitle: "从一个朴素问题开始：没有中介，两个陌生人能转账吗？",
    Component: Section0,
    bridge: {
      solved:
        "定位了核心难题：去中心化数字货币的本质是「就账本达成共识」，而不是「如何转账」。",
      remaining:
        "既然不要中介，那就让所有人都持有同一份账本吧？——但这份账本怎么可信？",
    },
  },
  {
    title: "公开账本",
    subtitle: "第一个直觉：既然不能有中介，那就全世界一起记账",
    Component: Section1,
    bridge: {
      solved:
        "确立了「公开账本」方向：不需要中介，而是让全网持有同一份账本。",
      remaining: "账本是数据，数据可以被篡改。怎么让一份账本「改动就会暴露」？",
    },
  },
  {
    title: "用哈希锁住账本",
    subtitle: "哈希 → 区块 → 链：改一个字，后面全崩",
    Component: Section2,
    bridge: {
      solved: "用哈希链让账本变成「改一处暴露一片」的结构。",
      remaining:
        "但攻击者可以重算后续所有哈希来掩盖篡改。必须让「生成区块」本身变得昂贵。",
    },
  },
  {
    title: "工作量证明（PoW）",
    subtitle: "让生成区块变得昂贵——谁先算出来，谁记账",
    Component: Section3,
    bridge: {
      solved:
        "用 PoW 把「生成区块」变成昂贵行为，配合最长链原则解决了共识和篡改成本。",
      remaining:
        "账本可信了。但账本上那行「Alice 转 Bob 5 块」——凭什么说这是 Alice 本人写的？",
    },
  },
  {
    title: "数字签名 & 地址",
    subtitle: "我怎么证明「这笔交易是我发的」？",
    Component: Section4,
    bridge: {
      solved: "签名 + 地址 解决了「这笔交易是谁发的」——私钥即身份。",
      remaining:
        "但账本上只有一笔笔「转账」，怎么快速算出「Alice 到底有多少钱」？",
    },
  },
  {
    title: "UTXO：余额到底是什么？",
    subtitle: "BTC 的世界里没有「账户余额」——只有一堆待花的硬币",
    Component: Section5,
    bridge: {
      solved:
        "UTXO 模型说清了「余额是什么」——它是你能解锁的硬币集合，而非账户里的一个数字。",
      remaining:
        "一个区块里可能有几千笔交易。手机钱包不想下载 1GB 才能确认自己那笔被打包了。怎么办？",
    },
  },
  {
    title: "Merkle Tree：轻客户端的魔法",
    subtitle: "不下载整个区块，也能证明「我那笔交易在里面」",
    Component: Section6,
    bridge: {
      solved:
        "Merkle Tree 让 SPV 钱包用 O(log n) 数据量验证交易被打包——轻客户端的理论基础。",
      remaining:
        "账本、共识、签名、余额、验证都有了。最后一个问题：挖矿奖励的 BTC 从哪儿来？第一个 BTC 凭什么凭空出现？",
    },
  },
  {
    title: "Coinbase 与减半：2100 万的来源",
    subtitle: "第一个 BTC 是怎么凭空生成的？总量上限又怎么推出来？",
    Component: Section7,
    bridge: {
      solved:
        "Coinbase + 减半 把「BTC 从哪来」讲清楚了——协议规则凭空生成，节奏可预测，总量封顶 2100 万。",
      remaining:
        "所有零件都到位了。最后一节把它们串起来，走一遍一笔交易从出生到被确认的完整旅程。",
    },
  },
  {
    title: "完整旅程：一笔交易的一生",
    subtitle: "把前 0-7 节的零件组装起来",
    Component: Section8,
    bridge: null,
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 pt-4 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Bitcoin: From First Principles
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
          从一个朴素问题出发，一步步推出 BTC 的全部设计。每一节由上一节遗留的问题驱动；
          每节内部分多个内页，覆盖直觉/推导/机制/对比/历史等不同角度。
          看完你会明白：BTC 的每一个零件，都是被迫存在的。
        </p>

        {/* Progress nav */}
        <nav className="flex flex-wrap justify-center gap-2 pt-4">
          {STEPS.map((label, i) => (
            <a
              key={i}
              href={`#step-${i}`}
              className="text-xs px-2.5 py-1 rounded-full border border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {i}. {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Sections */}
      {SECTION_META.map(({ title, subtitle, Component, bridge }, i) => (
        <div key={i}>
          <Section step={i} title={title} subtitle={subtitle}>
            <Component />
          </Section>
          {bridge && (
            <BridgeQuestion
              solved={bridge.solved}
              remaining={bridge.remaining}
            />
          )}
        </div>
      ))}

      {/* Outro */}
      <div className="text-center py-12 space-y-4 border-t border-[var(--card-border)] mt-8">
        <h2 className="text-xl font-bold">你现在理解 BTC 了</h2>
        <p className="text-sm text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
          从"两个陌生人怎么转账"这个朴素问题出发，经过 9 节推演，
          你应该已经看懂：BTC 的每一个零件都是
          <strong className="text-[var(--foreground)]">被前一个问题逼出来的解</strong>——
          不是灵感，是推导。
        </p>
        <p className="text-xs text-[var(--muted)]">
          Next: ETH 在这套基础上改变了什么？—— coming soon.
        </p>
      </div>
    </div>
  );
}
