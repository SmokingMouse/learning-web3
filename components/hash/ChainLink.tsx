"use client";

import { motion } from "framer-motion";

interface ChainLinkProps {
  isValid: boolean;
}

export function ChainLink({ isValid }: ChainLinkProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-8">
      <motion.div
        animate={{
          backgroundColor: isValid
            ? "var(--valid)"
            : "var(--invalid)",
          opacity: isValid ? 1 : 0.5,
        }}
        className="w-8 h-0.5 rounded-full"
      />
    </div>
  );
}
