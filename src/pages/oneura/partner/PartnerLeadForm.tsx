import React, { useState } from "react";
import { captureCampaignLead } from "../../../firebase/oneuraFunctions";

interface Props {
  campaignId: string | null;
  primaryColorHex?: string | null;
}

/**
 * Email capture below the app-store CTAs. Useful when a user lands on
 * a partner page but isn't ready to install yet — we record the email
 * against the campaign so ops can follow up.
 */
const PartnerLeadForm: React.FC<Props> = ({ campaignId, primaryColorHex }) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await captureCampaignLead({ email, campaignId });
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown";
      if (message === "invalid_email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Couldn't save that — please try again in a moment.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          color: "#cbd5e1",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        Thanks — we'll be in touch about your offer.
      </div>
    );
  }

  const accent = primaryColorHex ?? "#A855F7";

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        htmlFor="lead-email"
        style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 500 }}
      >
        Not ready to install? Drop your email and we'll send a reminder.
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          id="lead-email"
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
          {busy ? "Saving…" : "Notify me"}
        </button>
      </div>
      {error && (
        <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>
      )}
    </form>
  );
};

export default PartnerLeadForm;
