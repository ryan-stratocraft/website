import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import stratocraftLogo from "../assets/images/strato-craft/stratocraftlogo.jpg";
import oneuraLogo from "../assets/images/oneura/splashlogocolor.png";
import ohiLogo from "../assets/images/ohilogo.jpg";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      {/* Logo with Image - Stays on Left */}
      <Link to="/" className="navbar-logo-link">
        <img src={stratocraftLogo} alt="Strato-Craft" className="navbar-logo" />
        <h1>Strato-Craft</h1>
      </Link>

      {/* Navbar Links - Stays Centered */}
      <ul>
        <li><Link to="/" aria-current={isActive("/") ? "page" : undefined}>Home</Link></li>
        <li><Link to="/about" aria-current={isActive("/about") ? "page" : undefined}>About</Link></li>
        <li><Link to="/support" aria-current={isActive("/support") ? "page" : undefined}>Support</Link></li>

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
                <Link 
                  to="/oneura" 
                  className={`dropdown-item-with-icon ${isActive("/oneura") ? "active" : ""}`}
                  aria-current={isActive("/oneura") ? "page" : undefined}
                >
                  <img src={oneuraLogo} alt="Oneura" className="dropdown-icon" />
                  <span>Oneura</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/oh-i   " 
                  className={`dropdown-item-with-icon ${isActive("/oh-i") ? "active" : ""}`}
                  aria-current={isActive("/oh-i") ? "page" : undefined}
                >
                  <img src={ohiLogo} alt="Oh-i" className="dropdown-icon" />
                  <span>Oh - i</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/iac-vr" 
                  className={`dropdown-item-with-icon ${isActive("/iac-vr") ? "active" : ""}`}
                  aria-current={isActive("/iac-vr") ? "page" : undefined}
                >
                  <img src={stratocraftLogo} alt="IAC VR" className="dropdown-icon" />
                  <span>I.a.C VR</span>
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
