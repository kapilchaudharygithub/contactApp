// App.js
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

const App = () => {
  const dispatch = useDispatch();
  const appState = useSelector((_) => _);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/"
      );
      const data = await response.json();
      const contacts = data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.phone,
        email: contact.email,
      }));
      dispatch({ type: "FETCH_CONTACTS", payload: contacts });
    };

    if (appState.length === 0) {
      fetchData();
    }
  }, [appState.length, dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
