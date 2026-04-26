import { useState, useCallback, useMemo } from "react";
import { calculateBlockHash } from "@/lib/crypto";
import { GENESIS_PREV_HASH, DEFAULT_BLOCK_DATA } from "@/lib/constants";

export interface BlockData {
  index: number;
  data: string;
  prevHash: string;
  hash: string;
  originalHash: string;
}

function buildChain(dataArray: string[]): BlockData[] {
  const blocks: BlockData[] = [];
  for (let i = 0; i < dataArray.length; i++) {
    const prevHash = i === 0 ? GENESIS_PREV_HASH : blocks[i - 1].hash;
    const hash = calculateBlockHash(i, prevHash, dataArray[i]);
    blocks.push({
      index: i,
      data: dataArray[i],
      prevHash,
      hash,
      originalHash: hash,
    });
  }
  return blocks;
}

function recalcChain(blocks: BlockData[]): BlockData[] {
  const result: BlockData[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const prevHash = i === 0 ? GENESIS_PREV_HASH : result[i - 1].hash;
    const hash = calculateBlockHash(i, prevHash, blocks[i].data);
    result.push({
      ...blocks[i],
      prevHash,
      hash,
    });
  }
  return result;
}

export function useBlockchain(count: number = 5) {
  const initialBlocks = useMemo(
    () => buildChain(DEFAULT_BLOCK_DATA.slice(0, count)),
    [count]
  );
  const [blocks, setBlocks] = useState<BlockData[]>(initialBlocks);

  const updateBlockData = useCallback((index: number, newData: string) => {
    setBlocks((prev) => {
      const updated = prev.map((b, i) =>
        i === index ? { ...b, data: newData } : b
      );
      return recalcChain(updated);
    });
  }, []);

  const resetChain = useCallback(() => {
    setBlocks(buildChain(DEFAULT_BLOCK_DATA.slice(0, count)));
  }, [count]);

  return { blocks, updateBlockData, resetChain };
}
