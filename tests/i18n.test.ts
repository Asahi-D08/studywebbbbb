import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLang, pick, t } from "../src/lib/i18n.ts";

test("parseLang accepts zh and en, falls back to zh", () => {
  assert.equal(parseLang("en"), "en");
  assert.equal(parseLang("zh"), "zh");
  assert.equal(parseLang("ko"), "zh");
  assert.equal(parseLang(undefined), "zh");
  assert.equal(parseLang(null), "zh");
});

test("pick returns the requested language", () => {
  assert.equal(pick({ zh: "物理", en: "Physics" }, "en"), "Physics");
});

test("t interpolates variables", () => {
  assert.equal(t("progress.label", "en", { ready: 3, total: 10 }), "3/10 topics ready");
  assert.equal(t("progress.label", "zh", { ready: 3, total: 10 }), "3/10 个 Topic 已上线");
});
