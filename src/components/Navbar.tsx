import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo - Stays on Left */}
      <h1>Strato-Craft</h1>

      {/* Navbar Links - Stays Centered */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {/* Dropdown Menu for Apps */}
        <li 
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className="dropdown-toggle">Apps ▼</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/oh-i">Oh-i</Link></li>
              <li><Link to="/iac-vr">IAC VR</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
