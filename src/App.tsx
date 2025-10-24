import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/stratocraft/home/Home"; 
import About from "./pages/stratocraft/about/About";
import Support from "./pages/stratocraft/support/Support";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar"; // Import Navbar
import "./styles/global.css";

// Oh-i pages
import OhIHome from "./pages/oh-i/home/OhIHome";
import OhIAbout from "./pages/oh-i/about/About";
import CookiePolicy from "./pages/oh-i/cookie/CookiePolicy";
import PrivacyPolicy from "./pages/oh-i/privacy/PrivacyPolicy";
import DeleteData from "./pages/oh-i/delete/DeleteData";
import Subscription from "./pages/oh-i/subscription/Subscription";
import PersonalityQuiz from "./pages/oh-i/quiz/PersonalityQuiz";
import TermsAndConditions from "./pages/oh-i/terms/TermsAndConditions";
import VerifyBusiness from "./pages/oh-i/verifybusiness/VerifyBusiness";
import ChildSafetyPolicy from "./pages/oh-i/childsafety/ChildSafetyPolicy";


// B2B VR Product
import IacVrHome from "./pages/iac-vr/home/IacVrHome";
import IacVrAbout from "./pages/iac-vr/About";

// Oneura pages
import OneuraHome from "./pages/oneura/home/OneuraHome";
import OneuraAbout from "./pages/oneura/about/About";
import OneuraCookiePolicy from "./pages/oneura/cookie/CookiePolicy";
import OneuraPrivacyPolicy from "./pages/oneura/privacy/PrivacyPolicy";
import OneuraDeleteData from "./pages/oneura/delete/DeleteData";
import OneuraSubscription from "./pages/oneura/subscription/Subscription";
import OneuraTermsAndConditions from "./pages/oneura/terms/TermsAndConditions";

import CookieConsent from "./components/CookieConsent";


const App: React.FC = () => {
  return (
    <>
      {/* Navbar will always be visible on every page */}
      <Navbar />

      {/* 🔥 Wrap content to ensure pages appear below navbar */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />

          {/* Oh-i Product */}
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


          {/* B2B VR Tool */}
          <Route path="/iac-vr" element={<IacVrHome />} />
          <Route path="/iac-vr/about" element={<IacVrAbout />} />

          {/* Oneura Product */}
          <Route path="/oneura" element={<OneuraHome />} />
          <Route path="/oneura/about" element={<OneuraAbout />} />
          <Route path="/oneura/subscription" element={<OneuraSubscription />} />
          <Route path="/oneura/privacy-policy" element={<OneuraPrivacyPolicy />} />
          <Route path="/oneura/terms-and-conditions" element={<OneuraTermsAndConditions />} />
          <Route path="/oneura/cookie-policy" element={<OneuraCookiePolicy />} />
          <Route path="/oneura/delete-data" element={<OneuraDeleteData />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />

      </div>
    </>
  );
};

export default App;
