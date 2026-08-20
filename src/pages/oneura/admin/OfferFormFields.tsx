import React from "react";

/**
 * Shared form fields used by both AdminOfferCreate and AdminOfferEdit.
 *
 * Controlled component: the parent owns the `value` and applies
 * patches via `onChange`. This keeps the field UI in one place while
 * letting each consumer customise submission (setDoc vs updateDoc),
 * validation, and which sections are editable (slug is read-only in
 * edit mode).
 */

export interface OfferFormValue {
  slug: string;
  status: "active" | "paused" | "expired";
  partnerName: string;
  displayName: string;

  iosProductId: string;
  androidProductId: string;

  // Branding
  logoUrl: string;
  primaryColorHex: string;
  headline: string;
  body: string;
  ctaLabel: string;
  finePrint: string;
  heroImageUrl: string;

  // Advanced
  validUntilStr: string;
  redemptionCapStr: string;
  visibilityMode: "auto" | "always_card" | "always_hidden";
}

export const emptyOfferFormValue: OfferFormValue = {
  slug: "",
  status: "active",
  partnerName: "",
  displayName: "",
  iosProductId: "",
  androidProductId: "",
  logoUrl: "",
  primaryColorHex: "#A855F7",
  headline: "",
  body: "",
  ctaLabel: "Activate offer",
  finePrint: "",
  heroImageUrl: "",
  validUntilStr: "",
  redemptionCapStr: "",
  visibilityMode: "auto",
};

interface Props {
  value: OfferFormValue;
  onChange: (patch: Partial<OfferFormValue>) => void;
  mode: "create" | "edit";
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
}

const OfferFormFields: React.FC<Props> = ({
  value,
  onChange,
  mode,
  showAdvanced,
  onToggleAdvanced,
}) => {
  return (
    <>
      <Section title="Identity">
        <Field
          label="Slug"
          hint={
            mode === "create"
              ? "Lowercase, used in the URL: oneura.app/c/<slug>. e.g. williamsf1"
              : "Read-only after creation (it's the doc id)."
          }
        >
          <input
            value={value.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            required
            disabled={mode === "edit"}
            autoFocus={mode === "create"}
            placeholder="williamsf1"
            style={mode === "edit" ? readOnlyInputStyle : inputStyle}
          />
        </Field>
        <Field label="Status">
          <select
            value={value.status}
            onChange={(e) =>
              onChange({
                status: e.target.value as "active" | "paused" | "expired",
              })
            }
            style={inputStyle}
          >
            <option value="active">active</option>
            <option value="paused">paused</option>
            <option value="expired">expired</option>
          </select>
        </Field>
        <Field label="Partner name" hint="Shown in branded view only.">
          <input
            value={value.partnerName}
            onChange={(e) => onChange({ partnerName: e.target.value })}
            required
            placeholder="Williams Racing"
            style={inputStyle}
          />
        </Field>
        <Field
          label="Display name"
          hint="Optional. Defaults to partner name if blank."
        >
          <input
            value={value.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="Williams Racing × Oneura"
            style={inputStyle}
          />
        </Field>
      </Section>

      <Section
        title="Store products"
        subtitle="Point this campaign at one of the shared partner SKUs in App Store Connect / Play Console. The discount is baked into the SKU itself - multiple campaigns can reuse the same SKU and differ only by branding. Leave blank if the SKU isn't ready yet; the landing page still works."
      >
        <Field
          label="iOS App Store product id"
          hint="The plain product identifier you used in App Store Connect, e.g. oneura_plus_half."
        >
          <input
            value={value.iosProductId}
            onChange={(e) => onChange({ iosProductId: e.target.value })}
            placeholder="oneura_plus_half"
            style={inputStyle}
          />
        </Field>
        <Field
          label="Android Play product id"
          hint="Play needs the subscriptionId:basePlanId format for in-app purchases, e.g. oneura_plus_half:oneura-plus-50."
        >
          <input
            value={value.androidProductId}
            onChange={(e) => onChange({ androidProductId: e.target.value })}
            placeholder="oneura_plus_half:oneura-plus-50"
            style={inputStyle}
          />
        </Field>
      </Section>

      <Section title="Branding">
        <Field label="Logo URL">
          <input
            value={value.logoUrl}
            onChange={(e) => onChange({ logoUrl: e.target.value })}
            placeholder="https://…/logo.png"
            style={inputStyle}
          />
        </Field>
        <Field label="Primary color (hex)">
          <input
            value={value.primaryColorHex}
            onChange={(e) =>
              onChange({ primaryColorHex: e.target.value })
            }
            placeholder="#005EFF"
            style={inputStyle}
          />
        </Field>
        <Field label="Headline">
          <input
            value={value.headline}
            onChange={(e) => onChange({ headline: e.target.value })}
            placeholder="Williams Racing × Oneura - 50% off your first year"
            style={inputStyle}
          />
        </Field>
        <Field label="Body">
          <textarea
            value={value.body}
            onChange={(e) => onChange({ body: e.target.value })}
            rows={3}
            placeholder="Calmer evenings for the team. Oneura Plus annual, half price."
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>
        <Field
          label="In-app CTA label"
          hint='Button text on the branded offer card inside the app (subscription page). Defaults to "Activate offer". The website registration page uses its own button copy independent of this field.'
        >
          <input
            value={value.ctaLabel}
            onChange={(e) => onChange({ ctaLabel: e.target.value })}
            placeholder="Activate offer"
            style={inputStyle}
          />
        </Field>
        <Field label="Fine print">
          <textarea
            value={value.finePrint}
            onChange={(e) => onChange({ finePrint: e.target.value })}
            rows={2}
            placeholder="Offer for new Oneura subscribers. After first year, renews at standard price unless cancelled."
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>
        <Field label="Hero image URL (optional)">
          <input
            value={value.heroImageUrl}
            onChange={(e) => onChange({ heroImageUrl: e.target.value })}
            placeholder="https://…/hero.jpg"
            style={inputStyle}
          />
        </Field>
      </Section>

      <button
        type="button"
        onClick={onToggleAdvanced}
        style={advancedToggle}
      >
        {showAdvanced ? "− Hide advanced" : "+ Show advanced"}
      </button>

      {showAdvanced && (
        <Section title="Advanced">
          <Field
            label="Valid until"
            hint="Local time. Optional. Past this, the offer 404s."
          >
            <input
              type="datetime-local"
              value={value.validUntilStr}
              onChange={(e) => onChange({ validUntilStr: e.target.value })}
              style={inputStyle}
            />
          </Field>
          <Field
            label="Redemption cap"
            hint="Total redemptions allowed. Empty = unlimited."
          >
            <input
              type="number"
              min={1}
              value={value.redemptionCapStr}
              onChange={(e) =>
                onChange({ redemptionCapStr: e.target.value })
              }
              placeholder="e.g. 1000"
              style={inputStyle}
            />
          </Field>
          <Field label="Visibility mode">
            <select
              value={value.visibilityMode}
              onChange={(e) =>
                onChange({
                  visibilityMode: e.target.value as
                    | "auto"
                    | "always_card"
                    | "always_hidden",
                })
              }
              style={inputStyle}
            >
              <option value="auto">auto (follow Remote Config toggle)</option>
              <option value="always_card">
                always_card (generic 50% card for eligible users — social share promos)
              </option>
              <option value="always_hidden">
                always_hidden (force redeem panel only)
              </option>
            </select>
          </Field>
        </Section>
      )}
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

const advancedToggle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#A855F7",
  fontSize: 13,
  cursor: "pointer",
  marginBottom: 8,
  padding: 0,
};

export default OfferFormFields;

/* ─── Helpers used by both Create and Edit ──────────────────────── */

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;

/** Returns null on success, or an error string. */
export function validateOfferForm(
  value: OfferFormValue,
  mode: "create" | "edit",
): string | null {
  if (mode === "create" && !SLUG_RE.test(value.slug)) {
    return "Slug must be 3–40 chars, lowercase letters / digits / hyphens, starting and ending with a letter or digit.";
  }
  if (!value.partnerName.trim()) {
    return "Partner name is required.";
  }
  if (value.redemptionCapStr.trim()) {
    const n = Number(value.redemptionCapStr);
    if (!Number.isFinite(n) || n < 1) {
      return "Redemption cap must be a positive number.";
    }
  }
  return null;
}

/**
 * Translates the form values into the Firestore-shaped doc body
 * (without server timestamps / createdAt - caller adds those).
 */
export function offerFormToDoc(value: OfferFormValue): {
  slug: string;
  status: string;
  partnerName: string;
  displayName: string;
  iosProductId: string | null;
  androidProductId: string | null;
  branding: {
    logoUrl: string | null;
    primaryColorHex: string | null;
    headline: string;
    body: string;
    ctaLabel: string;
    finePrint: string | null;
    heroImageUrl: string | null;
  };
  validFrom: null;
  validUntilStr: string;
  redemptionCap: number | null;
  visibilityMode: string;
} {
  return {
    slug: value.slug,
    status: value.status,
    partnerName: value.partnerName.trim(),
    displayName: value.displayName.trim() || value.partnerName.trim(),
    iosProductId: value.iosProductId.trim() || null,
    androidProductId: value.androidProductId.trim() || null,
    branding: {
      logoUrl: value.logoUrl.trim() || null,
      primaryColorHex: value.primaryColorHex.trim() || null,
      headline: value.headline.trim(),
      body: value.body.trim(),
      ctaLabel: value.ctaLabel.trim() || "Activate offer",
      finePrint: value.finePrint.trim() || null,
      heroImageUrl: value.heroImageUrl.trim() || null,
    },
    validFrom: null,
    validUntilStr: value.validUntilStr,
    redemptionCap: value.redemptionCapStr.trim()
      ? Number(value.redemptionCapStr)
      : null,
    visibilityMode: value.visibilityMode,
  };
}
