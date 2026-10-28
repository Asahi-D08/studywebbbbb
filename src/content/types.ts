import type { ReactNode } from "react";
import type { Localized } from "@/lib/i18n";

export type Bilingual = { zh: ReactNode; en: ReactNode };

export type NoteSection = {
  /** Anchor id, unique within the topic. */
  id: string;
  /** "both": SL and HL. "hl": HL-only sub-topic, hidden in the SL-only view. */
  level: "both" | "hl";
  title: Localized;
  body: Bilingual;
};

export type TopicNotes = {
  summary: Localized;
  sections: NoteSection[];
  sources?: { label: string; href: string }[];
};
