import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  SUBJECTS,
  courseProgress,
  courseTopics,
  getCourse,
  getSubject,
  topicSlug,
} from "../src/lib/subjects.ts";

test("four subjects in display order", () => {
  assert.deepEqual(
    SUBJECTS.map((s) => s.slug),
    ["economics", "physics", "cs", "math"],
  );
});

test("physics: 25 topics, all ready", () => {
  const physics = getSubject("physics")!;
  assert.deepEqual(courseProgress(physics.courses[0]), { ready: 25, total: 25 });
});

test("economics: all 31 topics ready, each backed by a notes file", () => {
  const course = getSubject("economics")!.courses[0];
  assert.deepEqual(courseProgress(course), { ready: 31, total: 31 });
  for (const tp of courseTopics(course)) {
    assert.equal(tp.href, `/subjects/economics/${topicSlug(tp.code)}`);
    const file = path.join("src/content/economics", `${topicSlug(tp.code)}.tsx`);
    assert.ok(existsSync(file), `missing ${file}`);
  }
});

test("economics: HL-only topics match the IB guide", () => {
  const topics = courseTopics(getSubject("economics")!.courses[0]);
  assert.deepEqual(
    topics.filter((tp) => tp.hlOnly).map((tp) => tp.code),
    ["2.4", "2.10", "2.11", "2.12"],
  );
  assert.ok(topics.every((tp) => !(tp.hlOnly && tp.hasHL)));
});

test("cs and math are all coming soon", () => {
  for (const slug of ["cs", "math"]) {
    for (const course of getSubject(slug)!.courses) {
      assert.equal(courseProgress(course).ready, 0, `${slug}/${course.slug}`);
    }
  }
});

test("every static-note topic and extra links to a file in public/", () => {
  const hrefs: string[] = [];
  for (const s of SUBJECTS) {
    for (const c of s.courses) {
      for (const tp of courseTopics(c)) {
        if (tp.status === "ready") {
          assert.ok(tp.href, `${s.slug} ${tp.code} missing href`);
          if (!tp.href.startsWith("/subjects/")) hrefs.push(tp.href);
        }
      }
    }
    for (const e of s.extras ?? []) hrefs.push(e.href);
  }
  for (const href of hrefs) {
    assert.ok(existsSync(path.join("public", href)), `missing file for ${href}`);
  }
});

test("math: SL has no HL-only topics and fewer topics than HL", () => {
  const math = getSubject("math")!;
  const hl = getCourse(math, "aa-hl");
  const sl = getCourse(math, "aa-sl");
  assert.ok(courseTopics(sl).every((tp) => !tp.hlOnly));
  assert.ok(courseTopics(sl).length < courseTopics(hl).length);
});

test("getCourse falls back to the first course", () => {
  const math = getSubject("math")!;
  assert.equal(getCourse(math, "nope").slug, math.courses[0].slug);
  assert.equal(getCourse(math).slug, math.courses[0].slug);
});

test("topic codes are unique within a course", () => {
  for (const s of SUBJECTS) {
    for (const c of s.courses) {
      const codes = courseTopics(c).map((tp) => tp.code);
      assert.equal(new Set(codes).size, codes.length, `${s.slug}/${c.slug}`);
    }
  }
});

test("unknown subject is undefined", () => {
  assert.equal(getSubject("history"), undefined);
});
