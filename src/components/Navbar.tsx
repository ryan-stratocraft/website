import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Strato-Craft</Link></li>
        <li><Link to="/oh-i">Oh-i</Link></li>
        <li><Link to="/iac-vr">IAC VR Tool</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
