import type { ReactNode } from "react";

/** Key term with its exam-style definition. `term` stays in English. */
export function Def({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="notes-def">
      <div className="notes-def-term">{term}</div>
      <div>{children}</div>
    </div>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return <div className="notes-formula">{children}</div>;
}

export function Frac({ n, d }: { n: ReactNode; d: ReactNode }) {
  return (
    <span className="notes-frac">
      <span>{n}</span>
      <span>{d}</span>
    </span>
  );
}

/** Titled side note: evaluation points, worked examples, common mistakes. */
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="notes-callout">
      <div className="notes-callout-title">{title}</div>
      {children}
    </div>
  );
}

/** HL-only content inside an SL/HL section. Hidden in the SL-only view. */
export function HL({ children }: { children: ReactNode }) {
  return (
    <div className="hl-only notes-hl">
      <span className="notes-hl-badge">HL only</span>
      {children}
    </div>
  );
}
