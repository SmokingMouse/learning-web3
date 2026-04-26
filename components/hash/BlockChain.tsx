"use client";

import { useBlockchain } from "@/hooks/useBlockchain";
import { Block } from "./Block";
import { ChainLink } from "./ChainLink";
import { RotateCcw } from "lucide-react";

export function BlockChain() {
  const { blocks, updateBlockData, resetChain } = useBlockchain(5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--muted)]">
          Blockchain — try editing any block&apos;s data
        </h3>
        <button
          onClick={resetChain}
          className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>
      <div className="flex items-center overflow-x-auto pb-4 scrollbar-thin">
        {blocks.map((block, i) => (
          <div key={block.index} className="flex items-center">
            {i > 0 && (
              <ChainLink
                isValid={block.hash === block.originalHash}
              />
            )}
            <Block block={block} onDataChange={updateBlockData} />
          </div>
        ))}
      </div>
    </div>
  );
}
