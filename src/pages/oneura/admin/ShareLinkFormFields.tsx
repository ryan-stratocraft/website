import React from "react";

/**
 * Shared form fields for AdminShareLinkCreate + AdminShareLinkEdit.
 *
 * Controlled component: parent owns `value` and applies patches via
 * `onChange`. Mirrors the OfferFormFields shape so the two admin
 * areas feel consistent.
 */

export interface ShareLinkFormValue {
  slug: string;
  name: string;
  description: string;
  status: "active" | "paused";
  /** Comma-separated raw text from the input, e.g. "instagram, twitter, tiktok". */
  sourcesStr: string;
}

export const emptyShareLinkFormValue: ShareLinkFormValue = {
  slug: "",
  name: "",
  description: "",
  status: "active",
  sourcesStr: "",
};

interface Props {
  value: ShareLinkFormValue;
  onChange: (patch: Partial<ShareLinkFormValue>) => void;
  mode: "create" | "edit";
}

const ShareLinkFormFields: React.FC<Props> = ({ value, onChange, mode }) => {
  return (
    <>
      <Section title="Identity">
        <Field
          label="Slug"
          hint={
            mode === "create"
              ? "Lowercase, used in the URL: oneura.app/d/<slug>. e.g. spring-launch"
              : "Read-only after creation (it's the doc id)."
          }
        >
          <input
            value={value.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            required
            disabled={mode === "edit"}
            autoFocus={mode === "create"}
            placeholder="spring-launch"
            style={mode === "edit" ? readOnlyInputStyle : inputStyle}
          />
        </Field>
        <Field
          label="Name"
          hint="Human label shown only in the admin dashboard."
        >
          <input
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            placeholder="Spring 2026 launch"
            style={inputStyle}
          />
        </Field>
        <Field
          label="Description"
          hint="Optional. Internal notes about where this link is being used."
        >
          <textarea
            value={value.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={2}
            placeholder="Used in the YouTube launch trailer + Instagram bio."
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>
        <Field label="Status">
          <select
            value={value.status}
            onChange={(e) =>
              onChange({ status: e.target.value as "active" | "paused" })
            }
            style={inputStyle}
          >
            <option value="active">active</option>
            <option value="paused">paused</option>
          </select>
        </Field>
      </Section>

      <Section
        title="Sources"
        subtitle="Comma-separated list of attribution sources. Each one becomes a per-source QR + URL on the detail page, e.g. oneura.app/d/<slug>?src=instagram. Clicks under an unrecognised `src=` value bucket as `_other`; clicks with no `src=` bucket as `_direct`."
      >
        <Field
          label="Predefined sources"
          hint='Lowercase tokens, comma- or space-separated. e.g. "instagram, twitter, tiktok, youtube".'
        >
          <input
            value={value.sourcesStr}
            onChange={(e) => onChange({ sourcesStr: e.target.value })}
            placeholder="instagram, twitter, tiktok"
            style={inputStyle}
          />
        </Field>
      </Section>
    </>
  );
};

const Section: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <fieldset
    style={{
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "20px 24px",
      marginBottom: 16,
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <legend
      style={{
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        padding: "0 8px",
      }}
    >
      {title}
    </legend>
    {subtitle && (
      <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 16px" }}>
        {subtitle}
      </p>
    )}
    {children}
  </fieldset>
);

const Field: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, hint, children }) => (
  <label style={{ display: "block", marginBottom: 14 }}>
    <div
      style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 6, fontWeight: 500 }}
    >
      {label}
    </div>
    {children}
    {hint && (
      <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{hint}</div>
    )}
  </label>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(11,19,43,0.6)",
  color: "#fff",
  fontSize: 14,
  boxSizing: "border-box",
};

const readOnlyInputStyle: React.CSSProperties = {
  ...inputStyle,
  background: "rgba(11,19,43,0.3)",
  color: "#94a3b8",
  cursor: "not-allowed",
};

export default ShareLinkFormFields;

/* ─── Helpers used by both Create and Edit ──────────────────────── */

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;

/** Returns null on success, or an error string. */
export function validateShareLinkForm(
  value: ShareLinkFormValue,
  mode: "create" | "edit",
): string | null {
  if (mode === "create" && !SLUG_RE.test(value.slug)) {
    return "Slug must be 3–40 chars, lowercase letters / digits / hyphens, starting and ending with a letter or digit.";
  }
  if (!value.name.trim()) {
    return "Name is required.";
  }
  const sources = parseSources(value.sourcesStr);
  for (const s of sources) {
    if (s.startsWith("_")) {
      return `Source "${s}" is reserved (underscore prefixes are used for _direct / _other buckets).`;
    }
    if (!/^[a-z0-9][a-z0-9-_]*$/.test(s.toLowerCase())) {
      return `Source "${s}" is not a valid token. Use lowercase letters, digits, or hyphens.`;
    }
  }
  return null;
}

/**
 * Splits the comma/whitespace-separated source string into clean
 * unique tokens (preserving order). Tolerates trailing commas + mixed
 * separators ("instagram, twitter; tiktok").
 */
export function parseSources(raw: string): string[] {
  if (!raw) return [];
  const tokens = raw
    .split(/[,\s;]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tokens) {
    const lower = t.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(t);
  }
  return out;
}

/**
 * Translates the form values into the Firestore-shaped doc body
 * (without server timestamps / createdAt / counters — caller adds
 * those).
 */
export function shareLinkFormToDoc(value: ShareLinkFormValue): {
  slug: string;
  name: string;
  description: string | null;
  status: "active" | "paused";
  sources: string[];
} {
  return {
    slug: value.slug,
    name: value.name.trim(),
    description: value.description.trim() || null,
    status: value.status,
    sources: parseSources(value.sourcesStr),
  };
}
