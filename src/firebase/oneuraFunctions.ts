/**
 * Cross-project HTTPS wrappers for the Stage 2 partner-offers
 * framework. The website is hosted under Firebase project
 * `strato-craft-6c348` but the offer infrastructure (Firestore, Cloud
 * Functions) lives in `oneura-app`. We can't use the Firebase Functions
 * SDK pointed at our own project, so we call the function URLs
 * directly via fetch.
 *
 * The endpoints are public (`invoker: "public"`) and CORS-restricted on
 * the server to https://oneura.app / https://www.oneura.app /
 * localhost dev.
 *
 * Stage 1 functions (`getCampaignByCode`, `captureCampaignLead`,
 * `redeemCampaignCode`) have been replaced; do not re-introduce them.
 */

const FUNCTIONS_BASE =
  'https://europe-west2-oneura-app.cloudfunctions.net';

export interface OfferBranding {
  logoUrl: string | null;
  primaryColorHex: string | null;
  headline: string;
  body: string;
  ctaLabel: string;
  finePrint: string | null;
  heroImageUrl: string | null;
}

/**
 * Client-safe view of a campaign / offer. Mirrors `publicOfferView`
 * in `onuera_app/functions/shared/campaigns.js`. Server-only fields
 * (counts, caps, createdAt, …) are intentionally absent.
 *
 * `iosProductId` / `androidProductId` reference a shared pool of
 * reusable partner SKUs (e.g. `oneura_plus_half`) — many campaigns
 * can map to the same SKU, with branding differing per slug. No RC
 * offering / package identifier is exposed; the app purchases the
 * StoreProduct directly via `Purchases.purchaseStoreProduct`.
 */
export interface PublicOfferView {
  slug: string;
  status: string;
  partnerName: string | null;
  displayName: string | null;
  iosProductId: string | null;
  androidProductId: string | null;
  visibilityMode: 'auto' | 'always_card' | 'always_hidden';
  validUntil: string | null;
  branding: OfferBranding;
}

/**
 * Fetch the public branding payload for a partner-offer slug.
 * Returns `null` on 404 (unknown / paused / expired slug — never
 * disambiguates which).
 *
 * @param slug e.g. "williamsf1"
 */
export async function getOffer(slug: string): Promise<PublicOfferView | null> {
  const qs = new URLSearchParams({ slug });
  const res = await fetch(`${FUNCTIONS_BASE}/getOffer?${qs.toString()}`, {
    method: 'GET',
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`getOffer failed: ${res.status}`);
  }
  return (await res.json()) as PublicOfferView;
}

export interface RegisterForOfferInput {
  email: string;
  offerSlug: string;
  source?: string | null;
}

/**
 * Record a pre-install email + offerSlug. The `linkOfferEligibility`
 * Firestore trigger later attaches the eligibility to a Firebase Auth
 * user whose `email` field matches.
 *
 * Throws an `Error` whose `.message` is the server-side reason code
 * (`invalid_email`, `offer_slug_required`, `offer_not_found`,
 * `offer_not_active`, `http_500`, …) so the form can map to a
 * user-friendly message.
 */
export async function registerForOffer(
  input: RegisterForOfferInput,
): Promise<{ ok: true; id: string }> {
  const res = await fetch(`${FUNCTIONS_BASE}/registerForOffer`, {
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
