import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Oh-i pages
import OhIHome from "./pages/oh-i/OhIHome";
import OhIAbout from "./pages/oh-i/About";
import CookiePolicy from "./pages/oh-i/CookiePolicy";
import PrivacyPolicy from "./pages/oh-i/PrivacyPolicy";
import DeleteData from "./pages/oh-i/DeleteData";
import Subscription from "./pages/oh-i/Subscription";
import PersonalityQuiz from "./pages/oh-i/PersonalityQuiz";
import TermsAndConditions from "./pages/oh-i/TermsAndConditions";
import VerifyBusiness from "./pages/oh-i/VerifyBusiness";

import Navbar from "./components/Navbar";



// B2B VR Product
import IacVrHome from "./pages/iac-vr/IacVrHome";
import IacVrAbout from "./pages/iac-vr/About";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Company Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

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

        {/* B2B VR Tool */}
        <Route path="/iac-vr" element={<IacVrHome />} />
        <Route path="/iac-vr/about" element={<IacVrAbout />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;