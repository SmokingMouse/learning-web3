import SHA256 from "crypto-js/sha256";

export function sha256(input: string): string {
  return SHA256(input).toString();
}

export function calculateBlockHash(
  index: number,
  prevHash: string,
  data: string,
  nonce: number = 0
): string {
  return sha256(`${index}${prevHash}${data}${nonce}`);
}

export function meetsTarget(hash: string, difficulty: number): boolean {
  return hash.startsWith("0".repeat(difficulty));
}
