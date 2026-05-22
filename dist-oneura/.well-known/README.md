# Domain association files

These files prove to iOS and Android that this domain (`oneura.app`) is
owned by the same publisher as the Oneura app. They power **Universal
Links** (iOS) and **App Links** (Android), so URLs like
`https://oneura.app/c/APPLE_REVIEW` open the installed app directly
instead of the website.

## Placeholders to replace before going live

### `apple-app-site-association`

- Replace `REPLACE_WITH_APPLE_TEAM_ID` with your Apple Developer Team
  ID. Find it at <https://developer.apple.com/account> → Membership.
  Format is 10 alphanumeric characters, e.g. `A1B2C3D4E5`.
- The full `appIDs` entry then becomes
  `A1B2C3D4E5.com.stratocraft.oneura`.
- After uploading, verify with
  <https://branch.io/resources/aasa-validator/> — paste `oneura.app`.

### `assetlinks.json`

You need at least one SHA-256 cert fingerprint; ideally both:

1. **Play Store release signing cert** — Play Console → Setup → App
   signing → "App signing key certificate" → SHA-256 fingerprint.
2. **(optional) Local debug keystore** for testing locally:
   ```sh
   keytool -list -v -keystore ~/.android/debug.keystore \
     -alias androiddebugkey -storepass android -keypass android
   ```
   Look for the `SHA256:` line — copy the colon-separated hex pairs.

Paste the fingerprints into the array, replacing the `REPLACE_WITH_…`
strings. Format must match exactly: 64 hex chars separated by colons,
e.g. `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:60:91:6D:B4:5D:C9:91:80:6D:D9:5A:18`.

After uploading, verify with
<https://developers.google.com/digital-asset-links/tools/generator> or
Play Console → App content → App Links → re-run verification.

## How they get served

Vite copies `public/` to the build output (`dist/`). The
`prep-oneura-dist.mjs` script then mirrors `dist/` into `dist-oneura/`
which is what `oneura-web` Firebase Hosting serves. The path
`https://oneura.app/.well-known/apple-app-site-association` must
return:

- HTTP 200
- `Content-Type: application/json` (configured in `firebase.json`
  hosting headers — without this, the AASA file is served as
  `application/octet-stream` and Apple silently rejects it)
- No redirects
- No path rewrite to `index.html`

Firebase Hosting serves physical files in `public/` before applying
the `** → /index.html` rewrite, so the file is served as-is.
