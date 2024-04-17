// Importing necessary modules and components
import React, { useState, useEffect } from "react"; // Importing React library, useState and useEffect hooks
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks for Redux
import { Link, useNavigate, useParams } from "react-router-dom"; // Importing Link, useNavigate, and useParams for routing
import { toast } from "react-toastify"; // Importing toast for notifications

// EditContact component for editing contacts
const EditContact = () => {
  const [name, setName] = useState(""); // State variable for contact name
  const [email, setEmail] = useState(""); // State variable for contact email
  const [number, setNumber] = useState(""); // State variable for contact number

  const { id } = useParams(); // Extracting contact id from URL parameters

  const contacts = useSelector((state) => state); // Accessing contacts from Redux store state
  const dispatch = useDispatch(); // Accessing Redux dispatch function
  const navigate = useNavigate(); // Accessing navigation function
  const currentContact = contacts.find((contact) => contact.id === id); // Finding the current contact by id

  // Effect hook to update form fields when the current contact changes
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
    }
  }, [currentContact]);

  // Function to handle form submission and update contact
  const handleSubmit = (e) => {
    e.preventDefault();

    // Checking if email or number already exists for other contacts
    const checkEmail = contacts.find(
      (contact) => contact.id !== id && contact.email === email
    );
    const checkNumber = contacts.find(
      (contact) => contact.id !== id && contact.number === number
    );

    // Validating form fields
    if (!email || !number || !name) {
      return toast.warning("Please fill in all fields!");
    }

    // Showing error if email or number already exists
    if (checkEmail) {
      return toast.error("This email already exists!");
    }

    if (checkNumber) {
      return toast.error("This number already exists!");
    }

    // Creating updated contact data
    const data = {
      id: id,
      name,
      email,
      number,
    };

    // Dispatching action to update contact
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Contact updated successfully!!"); // Showing success notification
    navigate("/"); // Navigating back to the home page
  };

  // Rendering the form to edit contact details
  return (
    <div className="container">
      {/* Conditional rendering based on current contact existence */}
      {currentContact ? (
        <>
          {/* Heading to display current contact id being edited */}
          <h1 className="display-3 text-center fw-bold">Edit Contact {id}</h1>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              {/* Form for updating contact details */}
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
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)} // Event listener to update number state
                  />
                </div>
                {/* Submit button to update contact */}
                <div className="form-group mb-3">
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-dark"
                  />
                  {/* Button to cancel editing and navigate back to home page */}
                  <Link to="/" className="btn btn-danger ms-3 ">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        // Message displayed when the contact with the given id doesn't exist
        <h1 className="display-3 my-5 text-center fw-bold">
          Contact with id {id} does not exist!!
        </h1>
      )}
    </div>
  );
};

export default EditContact; // Exporting the EditContact component
