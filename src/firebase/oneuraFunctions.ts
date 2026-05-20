/**
 * Cross-project HTTPS wrapper for the campaign Cloud Functions.
 *
 * The website is hosted under Firebase project `strato-craft-6c348` but the
 * campaign infrastructure (Firestore, Cloud Functions) lives in `oneura-app`.
 * We can't use the Firebase Functions SDK pointed at our own project, so we
 * call the function URLs directly via fetch.
 *
 * The endpoints are public (`invoker: "public"`) and CORS-restricted on the
 * server to https://oneura.app / https://www.oneura.app / localhost dev.
 */

const FUNCTIONS_BASE =
  'https://europe-west2-oneura-app.cloudfunctions.net';

export interface CampaignBranding {
  logoUrl: string | null;
  primaryColorHex: string | null;
  headline: string;
  body: string;
  ctaLabel: string;
  finePrint: string | null;
  heroImageUrl: string | null;
}

export interface PublicCampaignView {
  campaignId: string;
  status: string;
  partnerName: string | null;
  displayName: string | null;
  grantType: 'promo_entitlement' | 'discounted_offer' | 'eligibility_only';
  grantDurationDays: number | null;
  validUntil: string | null;
  branding: CampaignBranding;
}

/** Resolves a campaign by raw partner code OR by campaignId. */
export async function getCampaignByCode(
  params: { code?: string; campaignId?: string },
): Promise<PublicCampaignView | null> {
  const qs = new URLSearchParams();
  if (params.code) qs.set('code', params.code);
  if (params.campaignId) qs.set('campaignId', params.campaignId);
  const res = await fetch(
    `${FUNCTIONS_BASE}/getCampaignByCode?${qs.toString()}`,
    { method: 'GET' },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`getCampaignByCode failed: ${res.status}`);
  }
  return (await res.json()) as PublicCampaignView;
}

/** Records an email against a campaign before install. */
export async function captureCampaignLead(input: {
  email: string;
  campaignId?: string | null;
}): Promise<{ ok: true; id: string }> {
  const res = await fetch(`${FUNCTIONS_BASE}/captureCampaignLead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok || data.ok !== true) {
    const reason = typeof data.error === 'string' ? data.error : `http_${res.status}`;
    throw new Error(reason);
  }
  return data as { ok: true; id: string };
}
