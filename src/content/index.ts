import type { TopicNotes } from "@/content/types";
import { ECONOMICS_NOTES } from "@/content/economics";

const NOTES: Record<string, Record<string, TopicNotes>> = {
  economics: ECONOMICS_NOTES,
};

export function getTopicNotes(subject: string, topicSlug: string): TopicNotes | undefined {
  return NOTES[subject]?.[topicSlug];
}
