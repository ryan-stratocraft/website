/**
 * Secondary Firebase app pointing at the `oneura-app` Firebase project,
 * used exclusively by the admin section under `/admin/offers/*` for
 * direct Firestore reads + writes to `/campaigns/*`.
 *
 * The website's primary Firebase init (`./firebase.ts`) is anchored at
 * `strato-craft-6c348` for site-level analytics + auth. Naming this
 * second app `'oneura-app-admin'` keeps the two SDKs isolated — calling
 * `getAuth(oneuraApp)` returns a separate session distinct from the
 * marketing-site auth.
 *
 * Security note: the API key below is the same public web key issued
 * by Firebase. Real protection comes from:
 *   1. Firestore rules — `/campaigns/{slug}` writes require
 *      `request.auth.token.email == 'raftherapies@gmail.com'`.
 *   2. The AdminGate component in `src/components/AdminGate.tsx` —
 *      hides the UI from anyone signed in as a different user.
 */

import { initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const ONEURA_APP_CONFIG = {
  apiKey: 'AIzaSyCQ-ik5o0Xirvgb3OeMlR4C8SZH5G6qSgM',
  authDomain: 'oneura-app.firebaseapp.com',
  projectId: 'oneura-app',
  storageBucket: 'oneura-app.firebasestorage.app',
  messagingSenderId: '878288833538',
  appId: '1:878288833538:web:fd336686161dcaa5b9eb1b',
  measurementId: 'G-43ZG0DCDEJ',
} as const;

const APP_NAME = 'oneura-app-admin';

function getOrInitOneuraApp(): FirebaseApp {
  try {
    return getApp(APP_NAME);
  } catch {
    return initializeApp(ONEURA_APP_CONFIG, APP_NAME);
  }
}

export const oneuraApp: FirebaseApp = getOrInitOneuraApp();
export const oneuraAuth: Auth = getAuth(oneuraApp);
export const oneuraDb: Firestore = getFirestore(oneuraApp);

/** Single email allowed to write `/campaigns/*` (mirrors firestore.rules). */
export const ONEURA_ADMIN_EMAIL = 'raftherapies@gmail.com';
