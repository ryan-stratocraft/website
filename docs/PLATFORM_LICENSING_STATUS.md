# Platform licensing — status and next steps

**Date:** 11 September 2026  
**Branch (both repos):** `feat/platform-licensing` -- pushed to origin, clean, not merged to `main`  
**App commit:** `afd93d8` | **Website commit:** `400f5d6`

Work moves between two machines. Clone paths differ; the branch names and the
remotes do not. See "Repos and branches" at the foot of this note before
assuming a path is stale.

This is a working status note for the Strato-Craft platform licence (white-label wellness apps). Oneura stays the neurodivergent product. Skip is a possible first commercial client later, not this build.

---

## Where we are

### App (Oneura as tenant zero)

Oneura on `feat/platform-licensing` now runs as `tenantId=oneura` on shared packages. The shipping look and behaviour are meant to stay the same.

Done:

- Tenant config schema (brand tokens, copy, legal URLs, module flags, home section lists, entitlements, deep-link host).
- Baked Oneura defaults so a missing published config cannot brick the app.
- Path packages: `sc_tenant`, `sc_audio_core`, `sc_entitlements`.
- Home, theme, nav labels, and Plus gating read tenant config.
- Control-plane functions in the existing `oneura-app` project: `publishTenantConfig`, `getPublishedTenantConfig`.
- Firestore rules for `platform_tenants/{id}/config/published` (public read of non-PII config; drafts operator-only).
- App Studio / SC Admin scaffold in the **Oneura repo** at `platform_web/` (not this website). Drafts save in the browser. Live publish is not wired through signed-in operator auth yet, and the new functions are not deployed.

Not done on the app:

- Functions not deployed to Firebase.
- Studio → publish → app colour/section change is not proven end-to-end.
- No `sc-platform` Firebase project yet (deliberate: dogfood on `oneura-app`).
- No Skip app, Skip Firebase, Terraform factory, or RevenueCat automation.

### Website (this repo)

Public marketing pages for the platform, on this branch only. `main` is unmerged.

Live routes (once this branch is deployed):

- `/platform` — proposition
- `/platform/capabilities`
- `/platform/content`
- `/platform/how-it-works`
- `/platform/contact` → `/support`

Also: navbar **Platform** link, home product card, support reason “Platform licensing”, sitemap and prerender metadata.

App Studio is **not** on strato-craft.com. That stays a separate authenticated surface (`platform_web` in the Oneura repo; later `cms.` / `admin.`).

Copy does not name Skip or imply a live licensee.

---

## What is true vs what is not live yet

| Claim | Status |
| --- | --- |
| Oneura can be expressed as tenant config | In code on the app branch |
| A second brand could be a JSON tenant | Schema exists; no second tenant built |
| Marketing site can sell the platform | Pages exist on this branch; not deployed |
| Client can publish home/colours without a store release | Designed; not proven until functions deploy + Studio publish |
| Skip-owned app on the platform | Not started |

---

## Next steps

1. **Keep `main` clean** until you have run Oneura from `feat/platform-licensing` and previewed `/platform` locally on this website branch.
2. **Run Oneura** on the app feature branch. Home, colours, tab labels, and Plus gating should match production.
3. **Deploy** `publishTenantConfig` and `getPublishedTenantConfig` to `oneura-app` when you want Studio publish to reach the app. Until then the app keeps baked Oneura config.
4. **Wire Studio publish** (operator sign-in) so a home section or colour change in App Studio shows in the app without a store release. App name, icons, and fonts still need a binary.
5. **Preview then deploy this website branch** to strato-craft.com when the copy is yours.
6. **Founder decisions:** exclusive vs licensable matrix (Daily Pulse / mood / body clock); which sounds/stories may be licensed; Adam/Skip commercial terms; whether to create `sc-platform` Firebase or keep dogfooding `oneura-app`.
7. **Later, only with a real second client:** Skip shell, dedicated Firebase/RevenueCat/store apps, Terraform client factory.

---

## Repos and branches

Both repos live on `feat/platform-licensing` on every machine. Origin is the
source of truth; the local paths below are just where each clone happens to sit.

| Work | Repo | Desktop path | Laptop path |
| --- | --- | --- | --- |
| Flutter app, packages, functions, App Studio | `onuera` | `C:\Users\fazza\StudioProjects\onuera` | `C:\Users\ryan.farrington\SC Repo\onuera_app` |
| Public `/platform` pages | `website` | `D:\Strato-Craft\website` | `C:\Users\ryan.farrington\SC Repo\website\website` |

**Dead clone:** `C:\Users\fazza\website` on the desktop. Unused -- do not open it.

Before starting on either machine, `git fetch` and confirm the branch is level
with origin. A path that looks wrong is probably just the other machine.
