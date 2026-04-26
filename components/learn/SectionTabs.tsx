"use client";

import { useState, type ReactNode } from "react";

export interface SectionPage {
  label: string;
  subtitle?: string;
  content: ReactNode;
}

interface SectionTabsProps {
  step: number;
  pages: SectionPage[];
}

export function SectionTabs({ step, pages }: SectionTabsProps) {
  const [active, setActive] = useState(0);
  const page = pages[active];

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="border-b border-[var(--card-border)]">
        <div className="flex gap-1 overflow-x-auto pb-px -mb-px scrollbar-thin">
          {pages.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`
                  group flex-shrink-0 relative px-4 py-2.5 text-xs transition-colors
                  ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                <span className="font-hash mr-2 opacity-60">
                  {step}.{i + 1}
                </span>
                <span className="font-medium">{p.label}</span>
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-px bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Page subtitle */}
      {page.subtitle && (
        <div className="text-xs uppercase tracking-wider text-[var(--muted)] -mt-1">
          {page.subtitle}
        </div>
      )}

      {/* Page content */}
      <div key={active} className="animate-fade-in">
        {page.content}
      </div>

      {/* Page navigation footer */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--card-border)]">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="text-xs text-[var(--muted)] hover:text-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← 上一页
        </button>
        <div className="flex gap-1.5">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === active
                  ? "bg-[var(--accent)] w-4"
                  : "bg-[var(--card-border)] hover:bg-[var(--muted)]"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => Math.min(pages.length - 1, a + 1))}
          disabled={active === pages.length - 1}
          className="text-xs text-[var(--muted)] hover:text-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          下一页 →
        </button>
      </div>
    </div>
  );
}

/**
 * Common content primitives for tab pages — keeps text dense and consistent
 */

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3.5 text-sm text-[var(--foreground)] leading-relaxed">
      {children}
    </div>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-[var(--foreground)] mt-5 mb-1">
      {children}
    </h3>
  );
}

export function KeyPoint({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-4 p-4 rounded-lg bg-[var(--background)] border border-[var(--card-border)] space-y-2 text-xs leading-relaxed">
      {label && (
        <div className="uppercase tracking-wider text-[var(--muted)]">
          {label}
        </div>
      )}
      <div className="text-[var(--foreground)] space-y-2">{children}</div>
    </div>
  );
}

export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-[var(--card-border)]">
      <table className="w-full text-xs">
        <thead className="bg-[var(--background)]">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3 py-2 font-medium text-[var(--muted)] uppercase tracking-wider text-[10px] border-b border-[var(--card-border)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={
                i < rows.length - 1
                  ? "border-b border-[var(--card-border)]/50"
                  : ""
              }
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 py-2.5 align-top text-[var(--foreground)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return (
    <strong className="text-[var(--foreground)] font-semibold">
      {children}
    </strong>
  );
}

export function Hl({ children }: { children: ReactNode }) {
  return <strong className="text-[var(--accent)] font-semibold">{children}</strong>;
}
