import React from "react";
import { Routes, Route } from "react-router-dom";
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
    {/* Partner landing — same component as oneura.app; localhost dev
        and legacy bookmarks hit these. Universal/App Link domain
        association only applies to oneura.app, so the canonical URL
        for QRs / emails is always oneura.app/c/<code>. */}
    <Route path="/oneura/c/:code" element={<PartnerLanding />} />
    <Route path="/oneura/partner/:campaignId" element={<PartnerLanding />} />

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
    {/* Partner campaign landing pages. QR codes / partner links point
        here; Universal Links / App Links intercept the same URLs and
        open the installed app instead of this page. */}
    <Route path="/c/:code" element={<PartnerLanding />} />
    <Route path="/partner/:campaignId" element={<PartnerLanding />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
