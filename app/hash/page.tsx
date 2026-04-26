"use client";

import { HashDemo } from "@/components/hash/HashDemo";
import { BlockChain } from "@/components/hash/BlockChain";

export default function HashPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Hash & Blockchain</h1>
        <p className="text-sm text-[var(--muted)]">
          哈希函数是区块链的基石。它将任意输入转换为固定长度的「指纹」，
          且不可逆、不可预测。区块链正是利用这个特性实现不可篡改。
        </p>
      </div>

      <HashDemo />

      <div>
        <h2 className="text-xl font-semibold mb-2">The Chain</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          每个区块的哈希值取决于它的内容和前一个区块的哈希。
          修改任何一个区块的数据，后续所有区块都会失效——这就是「不可篡改」的原理。
        </p>
        <BlockChain />
      </div>
    </div>
  );
}
