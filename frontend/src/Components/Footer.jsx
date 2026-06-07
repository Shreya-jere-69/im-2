import React from "react";


function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Inventory Management System</p>
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <span>Created by Shreya</span>
      </div>
    </footer>
  );
}

export default Footer;
