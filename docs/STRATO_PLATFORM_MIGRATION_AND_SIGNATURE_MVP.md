# Strato-Craft · org migration, Oneura domains, email signature MVP

This document aligns the [**Strato-Craft website**](../README.md) repo (Vite + React + Firebase Hosting in `dist/`) with:

1. **Website migration**: move production from legacy owner (`raftherapies@gmail.com`) to **organisation-owned** infrastructure under **`ryan@strato-craft.com`** (recommended: **new** Firebase/GCP web project separate from **`oneura-app`** backend).
2. **Oneura on web**: **`strato-craft.com`** and **`oneura.app`** - same UX where it matters, without unnecessary extra spend.
3. **Email signature “service”**: internal tool at **`strato-craft.com/signature`** (React route in this repo; not a separate product site like Oneura).

**Checklist convention**

| Owner | Meaning |
|--------|---------|
| **You** | Console, DNS, billing, IAM - human steps outside this repo |
| **Repo / agent** | Code, rules, commits in `website/` |

Tick boxes as you complete each step.

### Current Firebase web project (wired in this repo)

| Field | Value |
|--------|--------|
| **Firebase project name** | Strato-craft |
| **Project ID** | `strato-craft-6c348` |
| **Project number** | `310764074898` |
| **GCP parent** | `strato-craft.com` |
| **Default Storage bucket** | `gs://strato-craft-6c348.firebasestorage.app` |

**Web app config** is committed in **`src/firebase/firebase.ts`** (Firebase’s standard pattern - the Web `apiKey` is a public client identifier; lock down access with [API key restrictions](https://firebase.google.com/docs/projects/api-keys) and strict **Storage / Firestore / Auth** rules). App ID: `1:310764074898:web:9384a4ed1131ec3421334b` · GA4: `G-W0J3P4QZCM`.

**CLI default project** is `strato-craft-6c348` (see [`.firebaserc`](../.firebaserc)).

**Hosting sites** in this project:

| Site ID | Purpose |
|--------|---------|
| `strato-craft-6c348` | Main Strato-Craft site (`dist/`) |
| `oneura-web` | Dedicated Oneura product site (`dist-oneura/`) |

**Common mistake:** pasting a Web snippet from the **legacy** project `strato-craft`. If `messagingSenderId` / the middle segment of **`appId`** is **`1078258918920`**, that is wrong - this repo uses **`310764074898`** / **`1:310764074898:web:…`**.

Avoid sharing keys in public channels. The Web `apiKey` is shipped in the frontend bundle; tighten [API key restrictions](https://firebase.google.com/docs/projects/api-keys) (HTTP referrers) and keep **Storage rules** strict.

---

## How animated email signatures work (and spam risk)

- **Recipients’ mail apps do not run your JavaScript.** The pasted signature is **static HTML**: tables + inline CSS + **URLs** pointing at hosted images (still GIF/PNG/JPG - animation only where the client supports animated GIF).
- **`customesignature.com`-style setups** optimize GIF size, layouts, and sometimes host assets on a CDN. Bulky signatures (huge GIFs, many images, dense HTML) can affect **trust** more than Firebase vs another host; keep **GIF under ~150–400 KB**, few links, honest text.
- **This repo’s MVP**: Firebase is used **only** on the `/signature` page to **generate** signatures and optionally **upload** hero/logos to **Cloud Storage**. **Sending email** uses whatever you pasted into Gmail/Outlook - no backend at send time.

**You are not copying a huge block of opaque JavaScript into email** - you copy **HTML**. If a client rejects rich paste, paste from “Raw HTML” or use plain signature.

### GIF design rule (product default; Outlook-aware)

Exports and customer education should assume: **desired look is always achievable** even when animation is stripped.

1. **First frame → primary design.** Classic Outlook desktop often displays **only the first GIF frame**. Frame&nbsp;1 must match the intended “static” branding (crop, readability, logos if rasterised inside the GIF).
2. **Middle frames → optional motion** for clients that animate GIFs (Gmail, Apple Mail, etc.).
3. **Loop closes on frame&nbsp;1** (or a visually identical twin) so looping never clashes, and recipients on still-only clients always see the canonical look aligned with editors.

Timeline to teach in tooling: **1st frame → animation → … → match 1st frame** before upload.

---

## Part 1 - Website migration (new org project vs legacy)

### Goals

- **GCP/Firebase project** for the marketing site is owned/administered via **`ryan@strato-craft.com`** (organisation), not trapped on a legacy personal workspace.
- **Keep `oneura-app` Firebase separate** unless you consciously merge (recommended: separate: web vs app backends).

### You - prerequisites

- [ ] **Google organisation** (Workspace or Cloud Identity) for Strato-Craft billing/IAM ([Resource Manager overview](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)).
- [x] Project created under org: **`strato-craft-6c348`** (see table above).

### You - finish Firebase setup for this project

1. In [Firebase Console](https://console.firebase.google.com/) open project **Strato-craft** (`strato-craft-6c348`).
2. **Build** → **Authentication** → enable **Email/Password**; add your Strato-Craft user (e.g. **ryan@strato-craft.com**). **Anonymous** is no longer required for `/signature` (you may disable it).
3. **Build** → **Hosting** - first deploy from repo when ready.
4. **Build** → **Storage** - rules deployed from this repo (`firebase deploy --only storage`).

### Repo - already pointed at `strato-craft-6c348`

- [x] **`src/firebase/firebase.ts`** - full Web SDK config for **`strato-craft-6c348`** (app `1:310764074898:web:9384a4ed1131ec3421334b`).
- [x] **`.firebaserc`** - `default` is `strato-craft-6c348`.
- [ ] Run `firebase deploy --only hosting,storage` (add `firestore`, `functions` if you use them on this project).

### You - migrate custom domains (`strato-craft.com`)

1. In **legacy** Hosting: remove **`strato-craft.com`** / **`www`** (avoid duplicate claims).
2. In **new** project: Hosting → Connect domain → add DNS TXT + A records as instructed ([Firebase custom domain](https://firebase.google.com/docs/hosting/custom-domain)).
3. Wait for SSL provisioning; verify redirects if any.

### You - GCP org move (optional but ideal)

Your console already shows **Parent org/folder: strato-craft.com** - you can treat this section as satisfied unless another project remains on a legacy personal parent.

Otherwise, if some project starts under personal and must join the organisation:

- [ ] Follow Google’s checklist: [Migrate projects between organization resources](https://cloud.google.com/resource-manager/docs/project-migration) and [migration checklist](https://cloud.google.com/resource-manager/docs/project-migration-checklist).

### Repo - regression checks after cutover

- [ ] `/`, `/about`, `/support`, **product routes**.
- [ ] **`/signature`** uploads + clipboard (see Part 4).

### Deploy troubleshooting (CLI)

- **`Your credentials are no longer valid` / `Invalid project selection`:** run `firebase logout`, then `firebase login` (or `firebase login --reauth`), then `firebase projects:list` and confirm **`strato-craft-6c348`** appears.
- **`resolving hosting target of a site with no site name`:** `firebase.json` sets **`hosting.site`** to **`strato-craft-6c348`** (must match **Hosting → site ID** in Console). If your site ID differs, change that string to match.

---

## Part 2 - Oneura domains (`strato-craft.com` vs `oneura.app`)

Oneura remains **a product of Strato-Craft**. The Flutter app Firebase project (**`oneura-app`**) is unrelated to hosting this marketing site unless you deliberately integrate them.

### Cost note

Firebase Hosting billing is dominated by **egress/use**, not “number of domains”. **Two domains on the same Hosting site / same deployed `dist`** is normal; extra cost is not from “domains” alone.

### Recommended staging path

**A - Canonical product site on `oneura.app` (SEO clear)**  

- **`oneura.app`** → connect to **same** Hosting site **or** a dedicated Hosting site that deploys only the `/oneura` SPA slice (advanced).
- **`strato-craft.com/oneura`…** → **301 redirect** to the matching path on **`oneura.app`** (e.g. `/oneura` → `https://oneura.app/` or `/oneura/about` → `https://oneura.app/about` depending on routing you expose).

Firebase Hosting **`redirects`** are evaluated **before** SPA **`rewrites`**. Example pattern (adapt paths when you cut over):

```json
"redirects": [
  { "source": "/oneura", "destination": "https://oneura.app/", "type": 301 },
  { "source": "/oneura/about", "destination": "https://oneura.app/about", "type": 301 }
]
```

Add one rule per important path, or use a single catch‑all only if your Firebase Hosting version supports the exact pattern you need ([full Hosting config](https://firebase.google.com/docs/hosting/full-config)). External `destination` URLs do not always support the same `**` substitution as rewrites - verify on a **preview channel** before production.

**B - Same bundle on both hosts (duplicate content)**

- Attach **`oneura.app`** and **`strato-craft.com`** to the **same** Hosting site and serve identical routes. Mitigate SEO duplication with **canonical** `<link rel="canonical" …>` in `index.html` or per-route meta (React Helmet or build-time) - document this before going live.

**Do not** commit destructive redirects until DNS and the new project are ready; until then the SPA continues to serve `/oneura` from this repo as today.

### You - DNS for `oneura.app`

- [ ] At registrar, point **`oneura.app`** to Firebase Hosting per console instructions (same as main domain flow).

---

## Part 3 - Signature tool: monorepo vs separate repo

**Implemented in this repo (recommended for you):**

- Route: **`/signature`** - **not linked in the navbar** (URL-only until you ship it as a product).
- Code: `src/pages/stratocraft/signature/`

**Separate repo** (`strato-signature-generator/`) only if you need independent release cadence or public open-source; then either:

- publish static build into `website/public/signature/` (not used by Vite SPA today), or  
- iframe/embed (usually not worth it).

For your stack, **one React route** is simplest.

---

## Part 4 - Email signature MVP (implemented + your deploy steps)

### What was added in-repo

| Item | Purpose |
|------|--------|
| `src/pages/stratocraft/signature/SignatureGenerator.tsx` | Allowlist + email/password gate, form, preview, copy, uploads |
| `src/pages/stratocraft/signature/signature.css` | Page layout |
| `src/App.tsx` route `/signature` | SPA route |
| `storage.rules` | Public **read**; **writes** only for allowlisted email to `signatures/{uid}/…` |
| `src/firebase/firebase.ts` | Exports `firebaseAuth`, `firebaseStorage` |

### You - Firebase Console

- [ ] **Authentication** → **Sign-in method** → enable **Email/Password**; create the user you’ll use (e.g. **ryan@strato-craft.com**).
- [ ] **Authentication** → you may **disable Anonymous** - it is no longer used for `/signature`.
- [ ] **Storage** → deploy rules from this repo (`firebase deploy --only storage`).
- [ ] Optional: **budget alerts** for Storage egress.

### Access (not a public product yet)

- No **navbar** link - only visitors who type **`/signature`** see the tool.
- **Sign-in gate:** only allowlisted emails (default **ryan@strato-craft.com** in `SignatureGenerator.tsx` and in **`storage.rules`**). To allow more people: set **`VITE_SIGNATURE_ALLOWED_EMAILS`** (comma-separated) **and** duplicate those addresses in **`storage.rules`** (rules cannot read Vite env).

### Repo / agent - verify locally

```bash
cd website
npm install
npm run dev
# visit http://localhost:5173/signature
npm run build
```

### Behaviour

1. Open **`/signature`** → sign in with an allowlisted email.
2. Adjust fields (starts empty - no prefilled personal data for public visitors who might land on the route).
3. Upload **GIF/PNG/JPG ≤ 400 KB** or paste image URLs.
4. **Copy signature HTML** → paste into Gmail / Outlook / Apple Mail signature editor.
5. **Raw HTML** panel is for debugging; prefer rich copy when the client supports it.

### Optional later: Firestore `signatures/{id}`

The JSON schema you drafted is a good **Phase 2** for multi-user templates; MVP intentionally avoids Firestore to reduce scope. When you add it:

- Store **metadata** in Firestore; keep **blobs** in Storage.
- Lock writes to `request.auth.uid` or custom claims.

---

## Part 5 - Split you vs repo (quick reference)

| Task | Owner |
|------|--------|
| Create org + new Firebase web project | You |
| Update DNS / move domains off legacy project | You |
| Move GCP project under org | You |
| Update `firebase.ts`, `.firebaserc`, env | Repo |
| Choose Oneura redirect vs dual-serve + canonical | You + small repo change (`firebase.json` / meta) |
| Enable Email/Password + deploy Storage rules | You + `firebase deploy` |
| `/signature` UI & rules | Repo (done) |

---

## Appendix - Firestore shape (Phase 2, not implemented)

```json
{
  "ownerUid": "firebase-auth-uid",
  "name": "Ryan Farrington",
  "title": "Founder & Platform Engineer",
  "company": "Strato-Craft",
  "product": "Oneura",
  "phone": "+44 7588 629038",
  "websiteUrl": "https://strato-craft.com/",
  "productUrl": "https://oneura.app",
  "iosUrl": "https://apps.apple.com/...",
  "androidUrl": "https://play.google.com/...",
  "animatedHeroUrl": "https://...",
  "stratoCraftLogoUrl": "https://...",
  "productLogoUrl": "https://...",
  "createdAt": "serverTimestamp",
  "updatedAt": "serverTimestamp"
}
```

---

## Licence / ownership

Strato-Craft Ltd. Product names (e.g. Oneura) are examples in defaults; change fields for other Strato-Craft products.
