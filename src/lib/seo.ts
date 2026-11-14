import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/barberias";

const TITLE_SUFFIX_LENGTH = ` | ${SITE_NAME}`.length;
const MAX_TITLE_LENGTH = 65;

/**
 * The root layout template appends "| SITE_NAME". When that would push the title past ~65
 * characters (Google truncates beyond that), return an absolute title without the suffix.
 */
export function fitTitle(title: string): Metadata["title"] {
  return title.length + TITLE_SUFFIX_LENGTH <= MAX_TITLE_LENGTH
    ? title
    : { absolute: title };
}

/** Keeps meta descriptions within ~160 chars, cutting at a word boundary. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut
    .slice(0, lastSpace > 100 ? lastSpace : cut.length)
    .replace(/[\s,;:.—(-]+$/, "")}…`;
}
