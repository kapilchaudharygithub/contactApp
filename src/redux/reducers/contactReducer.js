// Defining initial state for contacts
const initialState = [];

// Reducer function to manage contact-related actions
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action to fetch contacts from an external source
    case "FETCH_CONTACTS":
      return action.payload;
    // Action to add a new contact to the state
    case "ADD_CONTACT":
      return [...state, action.payload];
    // Action to update an existing contact in the state
    case "UPDATE_CONTACT":
      // Updating the state by replacing the contact with the matching ID with the updated contact
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      console.log("update State : ", updateState); // Logging the updated state (optional)
      state = updateState; // Updating the state
      return state;
    // Action to delete a contact from the state
    case "DELETE_CONTACT":
      // Filtering out the contact with the specified ID from the state
      const filterContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      return filterContacts;
    // Default case returns the current state if no action matches
    default:
      return state;
  }
};

export default contactReducer; // Exporting the contactReducer function
