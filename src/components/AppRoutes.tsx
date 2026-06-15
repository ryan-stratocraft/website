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
import OneuraFaqPage from "../pages/oneura/faq/FaqPage";
import {
  BestFreeSleepSoundsAppPage,
  BestSleepAppForBusyMindsPage,
  MoodTrackingSleepAppPage,
  NeuroFriendlySleepAppPage,
  OneuraVsBetterSleepPage,
  OneuraVsCalmPage,
  OneuraVsHeadspacePage,
  SensoryRelaxationAppPage,
  SleepAppAdhdNeurodivergentPage,
  SleepSoundsForFocusPage,
  SleepAppForBusyMindsPage,
  SleepSoundsSensoryOverloadPage,
  SleepSoundsWhiteNoisePage,
  WhiteNoisePinkNoiseRainSoundsPage,
} from "../pages/oneura/topics/TopicLandingPage";
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
import { ONEURA_LOCALES } from "../i18n/localeConfig";

/** Wraps the admin section so children render only for the operator. */
const AdminSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AdminGate>{children}</AdminGate>
);

/**
 * Strato-Craft.com (company site). Oneura lives on its own canonical domain
 * (oneura.app); legacy /oneura/* paths are 301-redirected there at the hosting
 * layer (see firebase.json), so they are intentionally not routed here.
 */
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

    {/* Dev/local access for the Oneura product-only routes. Production
        strato-craft.com /oneura/* requests are redirected in firebase.json. */}
    <Route path="/oneura/c/:slug" element={<PartnerLanding />} />
    <Route path="/oneura/d/:slug" element={<ShareLinkRedirect />} />
    {oneuraLegacyPrefixedRedirects()}

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

/** oneura.app - clean URLs, no Oh-i / IAC routes. */
const ONEURA_PUBLIC_PAGES: Array<{
  path: string;
  Component: React.ComponentType;
}> = [
  { path: "/", Component: OneuraHome },
  { path: "/about", Component: OneuraAbout },
  { path: "/faq", Component: OneuraFaqPage },
  { path: "/subscription", Component: OneuraSubscription },
  { path: "/privacy-policy", Component: OneuraPrivacyPolicy },
  { path: "/terms-and-conditions", Component: OneuraTermsAndConditions },
  { path: "/cookie-policy", Component: OneuraCookiePolicy },
  { path: "/delete-data", Component: OneuraDeleteData },
  { path: "/sleep-sounds-white-noise", Component: SleepSoundsWhiteNoisePage },
  { path: "/sensory-relaxation-app", Component: SensoryRelaxationAppPage },
  { path: "/sleep-app-for-busy-minds", Component: SleepAppForBusyMindsPage },
  { path: "/neuro-friendly-sleep-app", Component: NeuroFriendlySleepAppPage },
  { path: "/mood-tracking-sleep-app", Component: MoodTrackingSleepAppPage },
  { path: "/sleep-sounds-for-focus", Component: SleepSoundsForFocusPage },
  {
    path: "/best-sleep-app-for-busy-minds",
    Component: BestSleepAppForBusyMindsPage,
  },
  {
    path: "/white-noise-pink-noise-rain-sounds",
    Component: WhiteNoisePinkNoiseRainSoundsPage,
  },
  {
    path: "/sleep-app-adhd-neurodivergent",
    Component: SleepAppAdhdNeurodivergentPage,
  },
  { path: "/oneura-vs-calm", Component: OneuraVsCalmPage },
  { path: "/oneura-vs-bettersleep", Component: OneuraVsBetterSleepPage },
  { path: "/oneura-vs-headspace", Component: OneuraVsHeadspacePage },
  {
    path: "/best-free-sleep-sounds-app",
    Component: BestFreeSleepSoundsAppPage,
  },
  {
    path: "/sleep-sounds-sensory-overload",
    Component: SleepSoundsSensoryOverloadPage,
  },
];

/** Dev/strato legacy links use `/oneura/about`; product routes are `/about`. */
function oneuraLegacyPrefixedRedirects() {
  return ONEURA_PUBLIC_PAGES.filter(({ path }) => path !== "/").map(
    ({ path }) => (
      <Route
        key={`legacy-oneura${path}`}
        path={`/oneura${path}`}
        element={<Navigate to={path} replace />}
      />
    ),
  );
}

function oneuraLocalizedPublicRoutes() {
  return ONEURA_PUBLIC_PAGES.flatMap(({ path, Component }) => {
    const element = <Component />;
    const paths = [path];

    for (const locale of ONEURA_LOCALES) {
      if (!locale.urlPrefix) continue;
      paths.push(
        path === "/" ? `/${locale.urlPrefix}` : `/${locale.urlPrefix}${path}`,
      );
    }

    return paths.map((routePath) => (
      <Route key={routePath} path={routePath} element={element} />
    ));
  });
}

export const OneuraProductSiteRoutes: React.FC = () => (
  <Routes>
    {oneuraLocalizedPublicRoutes()}
    {oneuraLegacyPrefixedRedirects()}
    <Route path="/c/:slug" element={<PartnerLanding />} />
    <Route path="/d/:slug" element={<ShareLinkRedirect />} />
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
