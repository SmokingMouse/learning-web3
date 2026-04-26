import { useMemo } from "react";
import { sha256 } from "@/lib/crypto";

export function useHash(input: string): string {
  return useMemo(() => sha256(input), [input]);
}
