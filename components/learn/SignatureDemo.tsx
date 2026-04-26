"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  ShieldCheck,
  ShieldX,
  RefreshCw,
} from "lucide-react";

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

type Step = "generate" | "sign" | "verify";

export function SignatureDemo() {
  const [currentStep, setCurrentStep] = useState<Step>("generate");
  const [keys, setKeys] = useState<{
    publicKey: CryptoKey;
    privateKey: CryptoKey;
    publicKeyHex: string;
    privateKeyD: string;
  } | null>(null);
  const [message, setMessage] = useState("Send 1 BTC to Bob");
  const [signature, setSignature] = useState("");
  const [verifyMsg, setVerifyMsg] = useState("Send 1 BTC to Bob");
  const [verifySig, setVerifySig] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleGenerate = async () => {
    const kp = await generateKeyPair();
    setKeys(kp);
    setSignature("");
    setVerifyResult(null);
    setCurrentStep("sign");
  };

  const handleSign = async () => {
    if (!keys) return;
    const sig = await signMessage(keys.privateKey, message);
    setSignature(sig);
    setVerifySig(sig);
    setVerifyMsg(message);
    setVerifyResult(null);
    setCurrentStep("verify");
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

  const stepTabs: { key: Step; label: string; num: number }[] = [
    { key: "generate", label: "Generate Keys", num: 1 },
    { key: "sign", label: "Sign", num: 2 },
    { key: "verify", label: "Verify", num: 3 },
  ];

  return (
    <div className="space-y-4">
      {/* Step tabs */}
      <div className="flex gap-2">
        {stepTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentStep(tab.key)}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-colors ${
              currentStep === tab.key
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
              {tab.num}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
        {currentStep === "generate" && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)]">
              生成一对 ECDSA 密钥。公钥可以公开分享，私钥必须保密。
            </p>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={14} />
              Generate Key Pair
            </button>
            {keys && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div>
                  <label className="text-xs text-[var(--muted)]">
                    Public Key (safe to share)
                  </label>
                  <div className="font-hash p-2 rounded-md bg-[var(--background)] text-emerald-400 border border-[var(--card-border)]">
                    {keys.publicKeyHex.slice(0, 48)}...
                  </div>
                </div>
                <div>
                  <label className="text-xs text-red-400">
                    Private Key (keep secret!)
                  </label>
                  <div className="font-hash p-2 rounded-md bg-[var(--background)] text-red-400 border border-red-500/30">
                    {keys.privateKeyD.slice(0, 32)}...
                  </div>
                </div>
                <p className="text-xs text-emerald-400">
                  Keys generated. Click &quot;Sign&quot; tab to continue.
                </p>
              </motion.div>
            )}
          </div>
        )}

        {currentStep === "sign" && (
          <div className="space-y-4">
            {!keys ? (
              <p className="text-sm text-[var(--muted)]">
                Please generate keys first (Step 1).
              </p>
            ) : (
              <>
                <p className="text-sm text-[var(--muted)]">
                  输入交易内容，用你的私钥签名。
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded-lg p-3 text-sm resize-none h-16 focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  onClick={handleSign}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                >
                  <PenTool size={14} />
                  Sign with Private Key
                </button>
                {signature && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-xs text-[var(--muted)]">
                      Signature
                    </label>
                    <div className="font-hash p-2 rounded-md bg-[var(--background)] text-[var(--accent)] border border-[var(--card-border)]">
                      {signature.slice(0, 48)}...
                    </div>
                    <p className="text-xs text-emerald-400 mt-2">
                      Signed! Click &quot;Verify&quot; tab — try changing the transaction text there.
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}

        {currentStep === "verify" && (
          <div className="space-y-4">
            {!signature ? (
              <p className="text-sm text-[var(--muted)]">
                Please sign a message first (Step 2).
              </p>
            ) : (
              <>
                <p className="text-sm text-[var(--muted)]">
                  这是别人收到的交易内容。试着修改它，然后点验证——
                  看看篡改后签名是否还有效。
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
                  className="flex items-center gap-1.5 px-4 py-2 text-xs rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                >
                  <ShieldCheck size={14} />
                  Verify with Public Key
                </button>
                {verifyResult !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 text-sm font-medium ${
                      verifyResult ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {verifyResult ? (
                      <>
                        <ShieldCheck size={16} />
                        Valid — the transaction is authentic and untampered.
                      </>
                    ) : (
                      <>
                        <ShieldX size={16} />
                        Invalid — the transaction content was modified!
                      </>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
