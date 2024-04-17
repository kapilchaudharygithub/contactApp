// Importing necessary modules and components
import React, { useState } from "react"; // Importing React library and useState hook
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks for Redux
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for routing
import { toast } from "react-toastify"; // Importing toast for notifications

// Function to generate a random alphanumeric ID
function generateId() {
  const alphanumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    id += alphanumeric.charAt(randomIndex);
  }

  return id;
}

// AddContact component for adding new contacts
const AddContact = () => {
  const [name, setName] = useState(""); // State variable for contact name
  const [email, setEmail] = useState(""); // State variable for contact email
  const [number, setNumber] = useState(""); // State variable for contact number

  const contacts = useSelector((state) => state); // Accessing contacts from Redux store state
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const navigate = useNavigate(); // Accessing navigation function

  // Function to handle form submission and add a new contact
  const handleSubmit = (e) => {
    e.preventDefault();

    // Checking if email or number already exists for other contacts
    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );
    const checkNumber = contacts.find(
      (contact) => contact.number === parseInt(number) && number
    );

    // Validating form fields
    if (!email || !number || !name) {
      return toast.warning("Fill all the details!");
    }

    // Showing error if email or number already exists
    if (checkEmail) {
      return toast.error("Email already exists! Please try with a new one");
    }

    if (checkNumber) {
      return toast.error(
        "This number already exists! Please try with a new one"
      );
    }

    // Generating a new ID and creating new contact data
    const id = generateId();
    const data = {
      id,
      name,
      email,
      number,
    };

    // Dispatching action to add a new contact
    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact added successfully!!"); // Showing success notification
    navigate("/"); // Navigating back to the home page
  };

  // Rendering the form to add a new contact
  return (
    <div className="container">
      {/* Heading to add a new contact */}
      <h1 className="display-3 text-center fw-bold">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          {/* Form for adding a new contact */}
          <form className="text-center" onSubmit={handleSubmit}>
            {/* Input fields for name, email, and number */}
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)} // Event listener to update name state
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Event listener to update email state
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                placeholder="Phone Number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)} // Event listener to update number state
              />
            </div>
            {/* Submit button to add the contact */}
            <div className="form-group mb-3">
              <input
                type="submit"
                value="Add Contact"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact; // Exporting the AddContact component
