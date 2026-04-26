"use client";

interface SectionProps {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function Section({ step, title, subtitle, children }: SectionProps) {
  return (
    <section className="scroll-mt-20" id={`step-${step}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
          {step}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-[var(--muted)] mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="ml-14">{children}</div>
    </section>
  );
}
