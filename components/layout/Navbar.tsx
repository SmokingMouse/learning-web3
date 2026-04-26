"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Blocks, Pickaxe, KeyRound } from "lucide-react";

const NAV_ITEMS = [
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/hash", label: "Hash & Chain", icon: Blocks },
  { href: "/mining", label: "Mining", icon: Pickaxe },
  { href: "/signature", label: "Signature", icon: KeyRound },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[var(--card-border)] bg-[var(--card)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Blockchain Visualizer
        </Link>
        <div className="flex gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === href
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
