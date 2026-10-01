/** Documented Grok TTS tags. Other brackets, such as [1] or [note], stay. */
const BRACKET_TAGS = [
  "pause",
  "long-pause",
  "laugh",
  "chuckle",
  "giggle",
  "cry",
  "sigh",
  "breath",
  "inhale",
  "exhale",
  "tsk",
  "tongue-click",
  "lip-smack",
  "hum-tune",
] as const;

const WRAP_TAGS = [
  "whisper",
  "soft",
  "loud",
  "emphasis",
  "build-intensity",
  "decrease-intensity",
  "slow",
  "fast",
  "higher-pitch",
  "lower-pitch",
  "singing",
  "sing-song",
] as const;

export const SPEECH_CHAR_LIMIT = 15_000;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Remove delivery tags that arrived in the source so the text cannot steer the voice. */
export function neutralizeSpeechTags(text: string): string {
  let out = text;
  for (const name of BRACKET_TAGS) {
    out = out.replace(new RegExp(`\\[${escapeRegExp(name)}\\]`, "gi"), "");
  }
  for (const name of WRAP_TAGS) {
    out = out.replace(new RegExp(`</?${escapeRegExp(name)}>`, "gi"), "");
  }
  return out;
}

function isTableSeparator(line: string): boolean {
  const cells = line.replace(/^\|/, "").replace(/\|$/, "").split("|");
  return (
    cells.length > 1 &&
    cells.every((cell) => /^:?-+:?$/.test(cell.trim()))
  );
}

function tableRowSentence(line: string): string {
  const cells = line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean);
  if (cells.length === 0) return "";
  return `${cells.join(", ")}.`;
}

/**
 * Speak prose. Markup becomes words, fenced code is omitted, and incoming
 * speech tags are removed. A `[pause]` inserted for an omitted code block
 * is kept, because tags are stripped before that marker is added.
 */
export function prepareSpeech(source: string): string {
  const withoutTags = neutralizeSpeechTags(source);
  const withoutFences = withoutTags.replace(
    /```[\s\S]*?```/g,
    "\n[pause] Code block omitted.\n",
  );

  const spoken = withoutFences.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed || isTableSeparator(trimmed)) return trimmed && isTableSeparator(trimmed) ? "" : trimmed;
    if (trimmed.startsWith("|")) return tableRowSentence(trimmed);
    return trimmed.replace(/^#{1,6}\s+/, "");
  });

  let text = spoken.join("\n");
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/(^|[\s])\*([^*\n]+)\*(?=[\s]|$)/g, "$1$2");
  text = text.replace(/[ \t]+([.,;:!?])/g, "$1");
  text = text.replace(/[ \t]{2,}/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

/** Question, then the answer as continuous prose (bullets included as sentences). */
export function prepareFaqSpeech(question: string, answer: string): string {
  const answerProse = answer
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) return trimmed.slice(2);
      return trimmed;
    })
    .filter(Boolean)
    .join(" ");
  const asked = question.trim().replace(/[.?!]$/, "");
  return prepareSpeech(`${asked}. ${answerProse}`);
}

/** Batch TTS accepts at most 15,000 characters. Split on paragraph, sentence, then word. */
export function splitSpeech(
  text: string,
  limit = SPEECH_CHAR_LIMIT,
): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= limit) return [trimmed];

  const parts: string[] = [];
  let rest = trimmed;
  while (rest.length > limit) {
    const paragraph = rest.lastIndexOf("\n\n", limit);
    const sentence = rest.lastIndexOf(". ", limit);
    const word = rest.lastIndexOf(" ", limit);
    let cut = -1;
    if (paragraph >= limit * 0.5) cut = paragraph;
    else if (sentence >= limit * 0.5) cut = sentence + 1;
    else if (word > 0) cut = word;
    else cut = limit;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
    if (!rest) break;
  }
  if (rest) parts.push(rest);
  return parts.filter(Boolean);
}
