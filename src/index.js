// Importing necessary modules and components
import React from "react"; // Importing React library
import { createRoot } from "react-dom/client"; // Importing createRoot from ReactDOM
import App from "./App"; // Importing the main App component

import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify CSS
import { BrowserRouter as Router } from "react-router-dom"; // Importing BrowserRouter
import { createStore } from "redux"; // Importing createStore from Redux
import contactReducer from "./redux/reducers/contactReducer"; // Importing the contactReducer
import { composeWithDevTools } from "redux-devtools-extension"; // Importing composeWithDevTools from Redux DevTools
import { Provider } from "react-redux"; // Importing Provider from React Redux

// Creating Redux store with the contactReducer and Redux DevTools
const store = createStore(contactReducer, composeWithDevTools());

// Creating a root element and rendering the App component wrapped in Redux Provider and BrowserRouter
const root = createRoot(document.querySelector("#root"));
root.render(
  // Providing Redux store to the entire application using Provider
  <Provider store={store}>
    {/* Using BrowserRouter to enable routing in the application */}
    <Router>
      {/* Rendering the main App component */}
      <App />
    </Router>
  </Provider>
);
