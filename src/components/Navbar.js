import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-center">
        <Link to="/" className="navbar-brand">
          Contact List - Kapil Chaudhary
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
