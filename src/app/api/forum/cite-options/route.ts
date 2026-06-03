import { NextRequest, NextResponse } from "next/server";
import { getProgram } from "@/lib/curriculum";
import { listSharedInProgram } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const program = req.nextUrl.searchParams.get("program");
  if (!program) {
    return NextResponse.json(
      { error: "program query param is required" },
      { status: 400 },
    );
  }
  const programDef = getProgram(program);
  if (!programDef) {
    return NextResponse.json({ error: "program not found" }, { status: 404 });
  }

  const notes = await listSharedInProgram(program);

  // Group by section + subject in the curriculum order so the picker can
  // render sections in a stable order.
  type Item = {
    id: string;
    title: string;
    kind: "text" | "file" | "image";
    createdAt: string;
  };
  type SubjectGroup = { slug: string; name: string; notes: Item[] };
  type SectionGroup = { slug: string; title: string; subjects: SubjectGroup[] };

  const sections: SectionGroup[] = [];
  for (const sec of programDef.sections) {
    const subjects: SubjectGroup[] = [];
    for (const sub of sec.subjects) {
      if (sub.redirectTo) continue;
      const items = notes
        .filter((n) => n.section === sec.slug && n.subject === sub.slug)
        .map<Item>((n) => ({
          id: n.id,
          title: n.title,
          kind: n.kind,
          createdAt: n.createdAt,
        }));
      if (items.length > 0) {
        subjects.push({ slug: sub.slug, name: sub.name, notes: items });
      }
    }
    if (subjects.length > 0) {
      sections.push({ slug: sec.slug, title: sec.title, subjects });
    }
  }

  return NextResponse.json({ program, sections });
}
