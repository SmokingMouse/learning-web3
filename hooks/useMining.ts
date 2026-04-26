import { useState, useCallback, useRef } from "react";
import { sha256, meetsTarget } from "@/lib/crypto";

export function useMining() {
  const [data, setData] = useState("Hello, blockchain!");
  const [nonce, setNonce] = useState(0);
  const [difficulty, setDifficulty] = useState(2);
  const [isMining, setIsMining] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [found, setFound] = useState(false);
  const abortRef = useRef(false);

  const hash = sha256(`${data}${nonce}`);

  const startMining = useCallback(() => {
    setIsMining(true);
    setFound(false);
    setAttempts(0);
    abortRef.current = false;

    let currentNonce = 0;

    function mineChunk() {
      if (abortRef.current) return;
      const chunkSize = 500;
      for (let i = 0; i < chunkSize; i++) {
        const h = sha256(`${data}${currentNonce}`);
        if (meetsTarget(h, difficulty)) {
          setNonce(currentNonce);
          setAttempts(currentNonce + 1);
          setIsMining(false);
          setFound(true);
          return;
        }
        currentNonce++;
      }
      setNonce(currentNonce - 1);
      setAttempts(currentNonce);
      requestAnimationFrame(mineChunk);
    }

    requestAnimationFrame(mineChunk);
  }, [data, difficulty]);

  const stopMining = useCallback(() => {
    abortRef.current = true;
    setIsMining(false);
  }, []);

  return {
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
  };
}
