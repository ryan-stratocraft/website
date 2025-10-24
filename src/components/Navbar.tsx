import React, { useState } from "react";
import { Link } from "react-router-dom";
import stratocraftLogo from "../assets/images/strato-craft/stratocraftlogo.jpg";
import oneuraLogo from "../assets/images/oneura/splashlogocolor.png";
import ohiLogo from "../assets/images/ohilogo.jpg";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo with Image - Stays on Left */}
      <Link to="/" className="navbar-logo-link">
        <img src={stratocraftLogo} alt="Strato-Craft" className="navbar-logo" />
        <h1>Strato-Craft</h1>
      </Link>

      {/* Navbar Links - Stays Centered */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>

        {/* Dropdown Menu for Apps */}
        <li 
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="dropdown-toggle">Apps ▼</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/oneura" className="dropdown-item-with-icon">
                  <img src={oneuraLogo} alt="Oneura" className="dropdown-icon" />
                  <span>Oneura</span>
                </Link>
              </li>
              <li>
                <Link to="/oh-i" className="dropdown-item-with-icon">
                  <img src={ohiLogo} alt="Oh-i" className="dropdown-icon" />
                  <span>Oh-i</span>
                </Link>
              </li>
              <li>
                <Link to="/iac-vr" className="dropdown-item-with-icon">
                  <img src={stratocraftLogo} alt="IAC VR" className="dropdown-icon" />
                  <span>IAC VR</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
