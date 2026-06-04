import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/stratocraft/home/Home";
import About from "../pages/stratocraft/about/About";
import Support from "../pages/stratocraft/support/Support";
import SignatureGenerator from "../pages/stratocraft/signature/SignatureGenerator";
import NotFound from "../pages/NotFound";

import OhIHome from "../pages/oh-i/home/OhIHome";
import OhIAbout from "../pages/oh-i/about/About";
import CookiePolicy from "../pages/oh-i/cookie/CookiePolicy";
import PrivacyPolicy from "../pages/oh-i/privacy/PrivacyPolicy";
import DeleteData from "../pages/oh-i/delete/DeleteData";
import Subscription from "../pages/oh-i/subscription/Subscription";
import PersonalityQuiz from "../pages/oh-i/quiz/PersonalityQuiz";
import TermsAndConditions from "../pages/oh-i/terms/TermsAndConditions";
import VerifyBusiness from "../pages/oh-i/verifybusiness/VerifyBusiness";
import ChildSafetyPolicy from "../pages/oh-i/childsafety/ChildSafetyPolicy";

import IacVrHome from "../pages/iac-vr/home/IacVrHome";
import IacVrAbout from "../pages/iac-vr/About";

import OneuraHome from "../pages/oneura/home/OneuraHome";
import OneuraAbout from "../pages/oneura/about/About";
import OneuraCookiePolicy from "../pages/oneura/cookie/CookiePolicy";
import OneuraPrivacyPolicy from "../pages/oneura/privacy/PrivacyPolicy";
import OneuraDeleteData from "../pages/oneura/delete/DeleteData";
import OneuraSubscription from "../pages/oneura/subscription/Subscription";
import OneuraTermsAndConditions from "../pages/oneura/terms/TermsAndConditions";
import PartnerLanding from "../pages/oneura/partner/PartnerLanding";
import ShareLinkRedirect from "../pages/oneura/share/ShareLinkRedirect";
import AdminGate from "./AdminGate";
import AdminOffersList from "../pages/oneura/admin/AdminOffersList";
import AdminOfferDetail from "../pages/oneura/admin/AdminOfferDetail";
import AdminOfferCreate from "../pages/oneura/admin/AdminOfferCreate";
import AdminOfferEdit from "../pages/oneura/admin/AdminOfferEdit";
import AdminShareLinksList from "../pages/oneura/admin/AdminShareLinksList";
import AdminShareLinkCreate from "../pages/oneura/admin/AdminShareLinkCreate";
import AdminShareLinkDetail from "../pages/oneura/admin/AdminShareLinkDetail";
import AdminShareLinkEdit from "../pages/oneura/admin/AdminShareLinkEdit";

/** Wraps the admin section so children render only for the operator. */
const AdminSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminGate>{children}</AdminGate>
);

/** Strato-Craft.com & legacy paths: /oneura/* stays for bookmarks. */
export const StratoSiteRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/support" element={<Support />} />
    <Route path="/signature" element={<SignatureGenerator />} />

    <Route path="/oh-i" element={<OhIHome />} />
    <Route path="/oh-i/about" element={<OhIAbout />} />
    <Route path="/oh-i/cookie-policy" element={<CookiePolicy />} />
    <Route path="/oh-i/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/oh-i/delete-data" element={<DeleteData />} />
    <Route path="/oh-i/subscription" element={<Subscription />} />
    <Route path="/oh-i/personality-quiz" element={<PersonalityQuiz />} />
    <Route path="/oh-i/terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="/oh-i/verify-business" element={<VerifyBusiness />} />
    <Route path="/oh-i/child-safety" element={<ChildSafetyPolicy />} />

    <Route path="/iac-vr" element={<IacVrHome />} />
    <Route path="/iac-vr/about" element={<IacVrAbout />} />

    <Route path="/oneura" element={<OneuraHome />} />
    <Route path="/oneura/about" element={<OneuraAbout />} />
    <Route path="/oneura/subscription" element={<OneuraSubscription />} />
    <Route path="/oneura/privacy-policy" element={<OneuraPrivacyPolicy />} />
    <Route path="/oneura/terms-and-conditions" element={<OneuraTermsAndConditions />} />
    <Route path="/oneura/cookie-policy" element={<OneuraCookiePolicy />} />
    <Route path="/oneura/delete-data" element={<OneuraDeleteData />} />
    {/* Partner-offer landing page. Universal/App Link domain association
        only applies to oneura.app, so the canonical URL for QRs / emails
        is always oneura.app/c/<slug>; this nested mount only exists for
        localhost dev. */}
    <Route path="/oneura/c/:slug" element={<PartnerLanding />} />

    {/* Share-link redirect. Same dev-only nesting story as /c/. */}
    <Route path="/oneura/d/:slug" element={<ShareLinkRedirect />} />

    {/* Admin lives on Strato too, but admin work always happens on the
        canonical oneura.app domain (Google sign-in popup is bound to
        that origin). The Strato copy is just so dev/localhost works. */}
    <Route path="/admin" element={<Navigate to="/admin/offers" replace />} />
    <Route
      path="/admin/offers"
      element={
        <AdminSection>
          <AdminOffersList />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/new"
      element={
        <AdminSection>
          <AdminOfferCreate />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/:slug"
      element={
        <AdminSection>
          <AdminOfferDetail />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/:slug/edit"
      element={
        <AdminSection>
          <AdminOfferEdit />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links"
      element={
        <AdminSection>
          <AdminShareLinksList />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/new"
      element={
        <AdminSection>
          <AdminShareLinkCreate />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/:slug"
      element={
        <AdminSection>
          <AdminShareLinkDetail />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/:slug/edit"
      element={
        <AdminSection>
          <AdminShareLinkEdit />
        </AdminSection>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

/** oneura.app — clean URLs, no Oh-i / IAC routes. */
export const OneuraProductSiteRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<OneuraHome />} />
    <Route path="/about" element={<OneuraAbout />} />
    <Route path="/subscription" element={<OneuraSubscription />} />
    <Route path="/privacy-policy" element={<OneuraPrivacyPolicy />} />
    <Route path="/terms-and-conditions" element={<OneuraTermsAndConditions />} />
    <Route path="/cookie-policy" element={<OneuraCookiePolicy />} />
    <Route path="/delete-data" element={<OneuraDeleteData />} />
    {/* Partner-offer landing page. QR codes / partner links point
        here; Universal Links / App Links intercept the same URLs and
        open the installed app instead of this page. */}
    <Route path="/c/:slug" element={<PartnerLanding />} />

    {/* Share-link redirect. UA-sniff → App Store / Play Store; the
        installed app intercepts via App Link instead and opens to
        home (DeepLinkService). Click metrics recorded server-side. */}
    <Route path="/d/:slug" element={<ShareLinkRedirect />} />

    {/* Admin section — gated to the operator email. */}
    <Route path="/admin" element={<Navigate to="/admin/offers" replace />} />
    <Route
      path="/admin/offers"
      element={
        <AdminSection>
          <AdminOffersList />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/new"
      element={
        <AdminSection>
          <AdminOfferCreate />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/:slug"
      element={
        <AdminSection>
          <AdminOfferDetail />
        </AdminSection>
      }
    />
    <Route
      path="/admin/offers/:slug/edit"
      element={
        <AdminSection>
          <AdminOfferEdit />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links"
      element={
        <AdminSection>
          <AdminShareLinksList />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/new"
      element={
        <AdminSection>
          <AdminShareLinkCreate />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/:slug"
      element={
        <AdminSection>
          <AdminShareLinkDetail />
        </AdminSection>
      }
    />
    <Route
      path="/admin/links/:slug/edit"
      element={
        <AdminSection>
          <AdminShareLinkEdit />
        </AdminSection>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);
