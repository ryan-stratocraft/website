import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  oneuraAuth,
  ONEURA_ADMIN_EMAIL,
} from "../firebase/oneuraFirestore";

interface Props {
  children: React.ReactNode;
}

/**
 * Gates everything under `/admin/offers/*` to the single Oneura
 * operator email. Signs the user into the secondary `oneura-app`
 * Firebase auth instance (NOT the marketing site auth) via Google so
 * Firestore rule `request.auth.token.email == 'raftherapies@gmail.com'`
 * resolves to true on writes to `/campaigns/*`.
 *
 * States:
 *   - loading: initial onAuthStateChanged subscription
 *   - signed-out: shows Sign-in button
 *   - signed-in (wrong email): shows "wrong account" + sign-out
 *   - signed-in (admin): renders children
 */
const AdminGate: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null | "loading">("loading");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(oneuraAuth, (u) => setUser(u));
  }, []);

  async function handleSignIn() {
    setBusy(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(oneuraAuth, provider);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Sign-in failed; please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    await signOut(oneuraAuth);
  }

  if (user === "loading") {
    return (
      <Frame>
        <div style={{ color: "#94a3b8" }}>Checking admin access…</div>
      </Frame>
    );
  }

  if (!user) {
    return (
      <Frame>
        <h2 style={{ color: "#fff", marginBottom: 12 }}>Oneura admin</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 20, fontSize: 14 }}>
          Sign in with the operator Google account to manage partner offers.
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={busy}
          style={primaryButton}
        >
          {busy ? "Signing in…" : "Sign in with Google"}
        </button>
        {error && (
          <div style={{ color: "#fca5a5", fontSize: 13, marginTop: 12 }}>
            {error}
          </div>
        )}
      </Frame>
    );
  }

  if (user.email !== ONEURA_ADMIN_EMAIL) {
    return (
      <Frame>
        <h2 style={{ color: "#fff", marginBottom: 12 }}>Not authorised</h2>
        <p style={{ color: "#cbd5e1", marginBottom: 20, fontSize: 14 }}>
          You're signed in as <strong>{user.email}</strong>, which doesn't
          have admin access. Sign out and try the operator account.
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          style={secondaryButton}
        >
          Sign out
        </button>
      </Frame>
    );
  }

  return (
    <>
      <AdminHeader email={user.email ?? ""} onSignOut={handleSignOut} />
      {children}
    </>
  );
};

interface AdminHeaderProps {
  email: string;
  onSignOut: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ email, onSignOut }) => (
  <div
    style={{
      background: "#0B132B",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#cbd5e1",
      fontSize: 13,
    }}
  >
    <div>
      <strong style={{ color: "#fff" }}>Oneura admin</strong>{" "}
      <span style={{ color: "#94a3b8" }}>· {email}</span>
    </div>
    <button
      type="button"
      onClick={onSignOut}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#cbd5e1",
        padding: "6px 12px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      Sign out
    </button>
  </div>
);

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "#0B132B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <div
      style={{
        maxWidth: 460,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 32,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  </div>
);

const primaryButton: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#A855F7",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "#cbd5e1",
  fontSize: 13,
  cursor: "pointer",
};

export default AdminGate;
