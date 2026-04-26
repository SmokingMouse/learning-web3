"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, PenTool, ShieldCheck, ShieldX, RefreshCw } from "lucide-react";

async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"]
  );
  const pubRaw = await crypto.subtle.exportKey("raw", keyPair.publicKey);
  const privJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    publicKeyHex: Array.from(new Uint8Array(pubRaw))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    privateKeyD: privJwk.d || "",
  };
}

async function signMessage(privateKey: CryptoKey, message: string) {
  const encoded = new TextEncoder().encode(message);
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    privateKey,
    encoded
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyMessage(
  publicKey: CryptoKey,
  message: string,
  signatureHex: string
) {
  const encoded = new TextEncoder().encode(message);
  const sigBytes = new Uint8Array(
    signatureHex.match(/.{2}/g)!.map((h) => parseInt(h, 16))
  );
  return crypto.subtle.verify(
    { name: "ECDSA", hash: "SHA-256" },
    publicKey,
    sigBytes,
    encoded
  );
}

function StepCard({
  step,
  title,
  icon: Icon,
  children,
}: {
  step: number;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold">
          {step}
        </div>
        <Icon size={16} className="text-[var(--accent)]" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SignaturePage() {
  const [keys, setKeys] = useState<{
    publicKey: CryptoKey;
    privateKey: CryptoKey;
    publicKeyHex: string;
    privateKeyD: string;
  } | null>(null);
  const [message, setMessage] = useState("Send 1 ETH to 0xBob");
  const [signature, setSignature] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("Send 1 ETH to 0xBob");
  const [verifySig, setVerifySig] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleGenerate = async () => {
    const kp = await generateKeyPair();
    setKeys(kp);
    setSignature("");
    setVerifyResult(null);
  };

  const handleSign = async () => {
    if (!keys) return;
    const sig = await signMessage(keys.privateKey, message);
    setSignature(sig);
    setVerifySig(sig);
    setVerifyMsg(message);
    setVerifyResult(null);
  };

  const handleVerify = async () => {
    if (!keys || !verifySig) return;
    try {
      const result = await verifyMessage(keys.publicKey, verifyMsg, verifySig);
      setVerifyResult(result);
    } catch {
      setVerifyResult(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Digital Signatures</h1>
        <p className="text-sm text-[var(--muted)]">
          数字签名让你无需透露私钥就能证明「这笔交易是我发起的」。
          任何人都可以用你的公钥验证签名，但只有私钥持有者能签名。
        </p>
      </div>

      <div className="space-y-4">
        <StepCard step={1} title="Generate Key Pair" icon={KeyRound}>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={14} />
            Generate Keys
          </button>
          {keys && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-[var(--muted)]">Public Key</label>
                <div className="font-hash p-2 rounded-md bg-[var(--background)] text-emerald-400 border border-[var(--card-border)]">
                  {keys.publicKeyHex.slice(0, 48)}...
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--muted)]">
                  Private Key (keep secret!)
                </label>
                <div className="font-hash p-2 rounded-md bg-[var(--background)] text-red-400 border border-red-500/30">
                  {keys.privateKeyD.slice(0, 32)}...
                </div>
              </div>
            </div>
          )}
        </StepCard>

        <StepCard step={2} title="Sign Transaction" icon={PenTool}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-lg p-3 text-sm resize-none h-16 focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={handleSign}
            disabled={!keys}
            className="mt-3 flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <PenTool size={14} />
            Sign
          </button>
          {signature && (
            <div className="mt-3">
              <label className="text-xs text-[var(--muted)]">Signature</label>
              <div className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--accent)] border border-[var(--card-border)]">
                {signature.slice(0, 48)}...
              </div>
            </div>
          )}
        </StepCard>

        <StepCard step={3} title="Verify Signature" icon={ShieldCheck}>
          <p className="text-xs text-[var(--muted)] mb-3">
            Try changing the transaction content below — the signature will become invalid.
          </p>
          <textarea
            value={verifyMsg}
            onChange={(e) => {
              setVerifyMsg(e.target.value);
              setVerifyResult(null);
            }}
            className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-lg p-3 text-sm resize-none h-16 focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={handleVerify}
            disabled={!keys || !verifySig}
            className="mt-3 flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <ShieldCheck size={14} />
            Verify
          </button>
          {verifyResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 flex items-center gap-2 text-sm font-medium ${
                verifyResult ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {verifyResult ? (
                <>
                  <ShieldCheck size={16} />
                  Signature is VALID — transaction is authentic
                </>
              ) : (
                <>
                  <ShieldX size={16} />
                  Signature is INVALID — transaction was tampered
                </>
              )}
            </motion.div>
          )}
        </StepCard>
      </div>
    </div>
  );
}
