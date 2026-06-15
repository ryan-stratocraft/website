import React from "react";
import { STRATO_CRAFT_SUPPORT_URL } from "../../../constants/origins";

const SUPPORT_LINK_RE =
  /(?:https?:\/\/)?(?:www\.)?strato-craft\.com\/support\b|\bSupport\b/gi;

function SupportPageLink({ label = "Support" }: { label?: string }) {
  return (
    <a
      href={STRATO_CRAFT_SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="oneura-topic-text-link"
    >
      {label}
    </a>
  );
}

function isSupportPageReference(text: string, index: number): boolean {
  const before = text.slice(Math.max(0, index - 16), index).toLowerCase();
  const after = text.slice(index + "Support".length);

  if (/^ without\b/i.test(after)) {
    return false;
  }

  return (
    /(?:tell us in|via |in |at |say so in |tell )$/.test(before) ||
    /^ if\b/i.test(after) ||
    /^ what\b/i.test(after)
  );
}

/** Renders topic copy with tappable Support / strato-craft.com/support links. */
export function topicTextWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(SUPPORT_LINK_RE)) {
    const index = match.index ?? 0;
    const value = match[0];

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    const isUrl = /strato-craft/i.test(value);
    if (isUrl || isSupportPageReference(text, index)) {
      const label = isUrl && value.startsWith("http") ? value : "Support";
      parts.push(<SupportPageLink key={key++} label={label} />);
    } else {
      parts.push(value);
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
