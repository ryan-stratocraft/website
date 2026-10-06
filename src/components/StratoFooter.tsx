import React from "react";
import { Link } from "react-router-dom";
import "./StratoFooter.css";

const StratoFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="strato-footer">
      <div className="strato-footer-content">
        <div className="strato-footer-company">
          <p className="strato-footer-name">Strato-Craft Ltd</p>
          <p className="strato-footer-reg">Company No. 15619171</p>
          <p className="strato-footer-address">
            3 Tildesley Drive, Willenhall, WV12 4JD, England
          </p>
        </div>

        <ul className="strato-footer-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </li>
        </ul>

        <p className="strato-footer-copyright">
          &copy; {currentYear} Strato-Craft Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default StratoFooter;
