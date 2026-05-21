import React, { useState } from "react";
import { registerForOffer } from "../../../firebase/oneuraFunctions";

interface Props {
  offerSlug: string;
  primaryColorHex?: string | null;
  source?: string | null;
  onRegistered: () => void;
}

/**
 * "Register for this offer" form on the partner landing page. Submits
 * the user's email + offerSlug to the `registerForOffer` Cloud
 * Function, which writes /offer_registrations server-side. The
 * `linkOfferEligibility` Firestore trigger later attaches eligibility
 * to whichever Firebase Auth user signs up with this email.
 *
 * Replaces the Stage 1 PartnerLeadForm (which posted to
 * captureCampaignLead). The submit-then-redirect flow now matches the
 * user intent: register here → install the app → claim the offer
 * inside the app.
 */
const OfferRegistrationForm: React.FC<Props> = ({
  offerSlug,
  primaryColorHex,
  source,
  onRegistered,
}) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await registerForOffer({
        email,
        offerSlug,
        source: source ?? null,
      });
      onRegistered();
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown";
      switch (reason) {
        case "invalid_email":
          setError("Please enter a valid email address.");
          break;
        case "offer_not_found":
        case "offer_not_active":
          setError("This offer is no longer available.");
          break;
        case "offer_slug_required":
          setError("Couldn't read the offer details. Try refreshing the page.");
          break;
        default:
          setError("Couldn't register — please try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  const accent = primaryColorHex ?? "#A855F7";

  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <label
        htmlFor="offer-email"
        style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}
      >
        Register for this offer
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          id="offer-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          placeholder="you@example.com"
          style={{
            flex: "1 1 220px",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(11,19,43,0.6)",
            color: "#fff",
            fontSize: 14,
          }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: accent,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "Registering…" : "Continue"}
        </button>
      </div>
      <p
        style={{
          color: "#94a3b8",
          fontSize: 12,
          margin: "4px 0 0",
          lineHeight: 1.5,
        }}
      >
        Use this email when you sign up in the Oneura app — that's how the
        offer attaches to your account. Guest / anonymous accounts can't
        redeem partner offers.
      </p>
      {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}
    </form>
  );
};

export default OfferRegistrationForm;
