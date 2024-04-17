// Importing necessary modules and components
import React, { useEffect } from "react"; // Importing React library and useEffect hook
import { ToastContainer } from "react-toastify"; // Importing ToastContainer component for notifications
import { Route, Routes } from "react-router-dom"; // Importing Route and Routes components for routing
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks for Redux

import Navbar from "./components/Navbar"; // Importing Navbar component for navigation
import Home from "./components/Home"; // Importing Home component for displaying contacts
import AddContact from "./components/AddContact"; // Importing AddContact component for adding new contacts
import EditContact from "./components/EditContact"; // Importing EditContact component for editing contacts

// Main App component
const App = () => {
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const appState = useSelector((_) => _); // Accessing Redux store state

  // Fetching contacts from an external API using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/"
      );
      const data = await response.json();
      // Transforming fetched data into the desired format
      const contacts = data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.phone,
        email: contact.email,
      }));
      // Dispatching fetched contacts to the Redux store
      dispatch({ type: "FETCH_CONTACTS", payload: contacts });
    };

    // Fetch data only if the appState is empty
    if (appState.length === 0) {
      fetchData();
    }
  }, [appState.length, dispatch]); // Dependency array to control the useEffect hook's execution

  // Rendering the main layout of the application
  return (
    <div className="App">
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
      {/* Navbar component for navigation */}
      <Navbar />
      {/* Defining routes for different components */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* Route for Home component */}
        <Route path="/add" element={<AddContact />} />
        {/* Route for AddContact component */}
        <Route path="/edit/:id" element={<EditContact />} />
        {/* Route for EditContact component */}
      </Routes>
    </div>
  );
};

export default App;
