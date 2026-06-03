// Curriculum data model — all labels in English on purpose.
//
// URL structure:   /[program]/[section]/[subject]
//
// Two programmes:
//   IGCSE — single section ("general") with a flat subject list.
//   IB    — six themed sections matching IB-style groups.
//
// Section 6 (IB) contains an "Economics" entry that is intentionally a
// pointer to the canonical Economics under Section 4 — clicking it (or
// visiting the URL directly) redirects to /ib/section-4/economics.

export type Subject = {
  /** URL slug, lowercase + dash separated. */
  slug: string;
  /** Human-readable English name. */
  name: string;
  /** Optional short caption / IB style code etc. */
  caption?: string;
  /**
   * If set, this subject is an alias that should redirect to another
   * (section, subject) pair within the same programme.
   */
  redirectTo?: { section: string; subject: string };
};

export type Section = {
  /** URL slug. */
  slug: string;
  /** "Section 1", "Section 2", … (or "All Subjects" for IGCSE). */
  number?: number;
  /** Display title. */
  title: string;
  /** Short tagline shown on cards. */
  tagline: string;
  subjects: Subject[];
};

export type Program = {
  /** URL slug, e.g. "ib". */
  slug: "igcse" | "ib";
  /** Display name. */
  name: string;
  /** One-line description. */
  description: string;
  sections: Section[];
};

// IB — six themed sections.
const ibSections: Section[] = [
  {
    slug: "section-1",
    number: 1,
    title: "Section 1 — Languages & Literature",
    tagline: "Language A · Language B · Spanish · Korean",
    subjects: [
      { slug: "language-a", name: "Language A", caption: "Studies in language & literature" },
      { slug: "language-b", name: "Language B", caption: "Language acquisition" },
      { slug: "spanish", name: "Spanish" },
      { slug: "korean", name: "Korean" },
    ],
  },
  {
    slug: "section-2",
    number: 2,
    title: "Section 2 — Mathematics",
    tagline: "Math AAHL · AASL · AISL",
    subjects: [
      { slug: "math-aahl", name: "Math AAHL", caption: "Analysis & Approaches HL" },
      { slug: "math-aasl", name: "Math AASL", caption: "Analysis & Approaches SL" },
      { slug: "math-aisl", name: "Math AISL", caption: "Applications & Interpretation SL" },
    ],
  },
  {
    slug: "section-3",
    number: 3,
    title: "Section 3 — English",
    tagline: "English A · English B",
    subjects: [
      { slug: "english-a", name: "English A", caption: "Literature focus" },
      { slug: "english-b", name: "English B", caption: "Language acquisition" },
    ],
  },
  {
    slug: "section-4",
    number: 4,
    title: "Section 4 — Individuals & Societies",
    tagline: "Economics · History · Psychology",
    subjects: [
      { slug: "economics", name: "Economics" },
      { slug: "history", name: "History" },
      { slug: "psychology", name: "Psychology" },
    ],
  },
  {
    slug: "section-5",
    number: 5,
    title: "Section 5 — Sciences & Design",
    tagline: "Physics · Biology · Design Technology",
    subjects: [
      { slug: "physics", name: "Physics" },
      { slug: "biology", name: "Biology" },
      { slug: "dt", name: "Design Technology", caption: "DT" },
    ],
  },
  {
    slug: "section-6",
    number: 6,
    title: "Section 6 — Arts, Computing & Business",
    tagline: "Chemistry · Film · CS · Economics · Business",
    subjects: [
      { slug: "chemistry", name: "Chemistry" },
      { slug: "film", name: "Film" },
      { slug: "cs", name: "Computer Science", caption: "CS" },
      {
        slug: "economics",
        name: "Economics",
        caption: "Redirects to Section 4",
        redirectTo: { section: "section-4", subject: "economics" },
      },
      { slug: "business", name: "Business" },
    ],
  },
];

// IGCSE — flat list of subjects under one section.
const igcseSection: Section = {
  slug: "general",
  title: "All Subjects",
  tagline: "Upload notes for any subject",
  subjects: [
    { slug: "mathematics", name: "Mathematics" },
    { slug: "english", name: "English" },
    { slug: "sciences", name: "Sciences", caption: "Physics · Chemistry · Biology" },
    { slug: "humanities", name: "Humanities", caption: "History · Geography · Economics" },
    { slug: "languages", name: "Languages", caption: "Spanish · Korean · Other" },
    { slug: "arts-and-design", name: "Arts & Design" },
    { slug: "computing", name: "Computing" },
    { slug: "other", name: "Other" },
  ],
};

export const CURRICULUM: Program[] = [
  {
    slug: "igcse",
    name: "IGCSE",
    description:
      "International General Certificate of Secondary Education — foundations across every subject.",
    sections: [igcseSection],
  },
  {
    slug: "ib",
    name: "IB",
    description: "International Baccalaureate Diploma — six themed sections.",
    sections: ibSections,
  },
];

export function getProgram(slug: string): Program | undefined {
  return CURRICULUM.find((p) => p.slug === slug);
}

export function getSection(programSlug: string, sectionSlug: string): Section | undefined {
  return getProgram(programSlug)?.sections.find((s) => s.slug === sectionSlug);
}

export function getSubject(
  programSlug: string,
  sectionSlug: string,
  subjectSlug: string,
): Subject | undefined {
  return getSection(programSlug, sectionSlug)?.subjects.find((s) => s.slug === subjectSlug);
}
