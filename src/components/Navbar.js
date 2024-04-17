// Importing necessary modules and components
import React from "react"; // Importing React library
import { Link } from "react-router-dom"; // Importing Link component for navigation

// Navbar component for navigation
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-center">
        {/* Link to navigate to the home page */}
        <Link to="/" className="navbar-brand">
          Contact List - Kapil Chaudhary
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; // Exporting the Navbar component
