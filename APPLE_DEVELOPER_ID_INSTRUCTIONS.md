# How to Find Your Apple Developer ID

## What You Need

Your **Apple Developer ID** is needed to update the website's Schema.org structured data so Google and other search engines can properly link your apps to your company.

---

## Steps to Find Your Apple Developer ID

### Option 1: Through App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Sign in with your Apple ID (the one used for your developer account)
3. Click on "My Apps"
4. Click on any of your published apps (e.g., "Oneura" or "Oh-i")
5. In the URL, you'll see your developer ID

**Example URL:**
```
https://appstoreconnect.apple.com/apps/YOUR_APP_ID/appstore/...
```

### Option 2: Through Your Developer Profile

1. Go to your [Apple Developer Account](https://developer.apple.com/account/)
2. Sign in
3. Click on "Membership Details"
4. Look for your "Team ID" - this is often used in structured data

### Option 3: Through the App Store

1. Open the **App Store** on Mac or iOS
2. Search for one of your apps (e.g., "Oneura" or "Oh-i")
3. Click on your company name "Strato-Craft Ltd"
4. The URL will contain your developer ID

**Example URL:**
```
https://apps.apple.com/us/developer/strato-craft-ltd/id1234567890
```

The number at the end (`id1234567890`) is your Apple Developer ID.

---

## Once You Have It

Replace the placeholder in `website/index.html`:

**Current (line 61):**
```html
"https://apps.apple.com/developer/strato-craft-ltd/id-placeholder"
```

**Replace with:**
```html
"https://apps.apple.com/developer/strato-craft-ltd/idYOUR_ACTUAL_ID"
```

**Example:**
```html
"https://apps.apple.com/developer/strato-craft-ltd/id1234567890"
```

---

## Why This Matters

Adding your Apple Developer ID to the Schema.org structured data helps:
- **Google** understand your business owns these apps
- **Search engines** link your website to your App Store presence
- **Users** find all your apps when searching for your company
- **SEO** improve your website's visibility in search results

---

## Current Status

✅ **Google Play Developer ID:** `6109497756704463260` (already configured)
⏳ **Apple Developer ID:** Placeholder - needs to be updated once available

---

## Note

If you haven't published any apps on the Apple App Store yet, you can:
1. Leave the placeholder for now
2. Remove the line entirely until you publish
3. Add it later when you have your first iOS app published

The line in `website/index.html` is:
```json
"sameAs": [
  "https://play.google.com/store/apps/dev?id=6109497756704463260",
  "https://apps.apple.com/developer/strato-craft-ltd/id-placeholder"
],
```

