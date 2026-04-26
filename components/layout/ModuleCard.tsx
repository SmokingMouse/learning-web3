import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ModuleCard({ href, title, description, icon: Icon }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
          <Icon size={24} />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>
    </Link>
  );
}
