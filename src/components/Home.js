// Importing necessary modules and components
import React from "react"; // Importing React library
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks for Redux
import { Link } from "react-router-dom"; // Importing Link component for navigation
import { toast } from "react-toastify"; // Importing toast for notifications

// Home component for displaying contacts
const Home = () => {
  // Accessing contacts from Redux store state
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch(); // Accessing Redux dispatch function

  // Function to delete a contact
  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id }); // Dispatching action to delete contact
    toast.success("Contact deleted successfully!"); // Showing success notification
  };

  // Rendering the main layout of the home page
  return (
    <div className="container">
      <div className="row">
        {/* Button to navigate to the AddContact page */}
        <div className="col-md-12 my-5 text-end">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        {/* Table to display contacts */}
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            {/* Table header */}
            <thead className="text-dark bg-light text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Mapping through contacts to display each contact */}
              {contacts.map((contact, id) => (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.number}</td>
                  {/* Buttons to edit and delete a contact */}
                  <td>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteContact(contact.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home; // Exporting the Home component
