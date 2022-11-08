import React, { useState, useEffect } from "react";
import { View } from "./components/View";
import Searchbar from "./Searchbar";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("contacts");
  if (data) {
    const r = JSON.parse(data);
    return r;
  } else {
    return [];
  }
};

export const App = () => {
  // main array of objects state || contacts state || contacts array of objects
  const [contacts, setcontacts] = useState(getDatafromLS());
  const [contactList, setContactList] = useState(contacts);

  // input field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const [newData, setNewData] = useState(contactList[editIndex]);

  // form submit event
  const handleAddcontactsubmit = (e) => {
    e.preventDefault();
    // creating an object
    let book = {
      id,
      firstName,
      lastName,
      phoneNumber,
    };
    setcontacts([...contacts, book,]);
    setContactList([...contacts, book]);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setId(id + 1);
  };

  // delete book from LS
  const deleteBook = (id) => {
    const deleteIndex = contacts.findIndex((b) => b.id === id);
    contacts.splice(deleteIndex, 1);
    //console.log(contacts)
    setcontacts([...contacts]);
  };

  const editBook = (id) => {
    setEditIndex(id);
    const edited = contacts.filter((b) => b.id === id);

    setNewData(edited[0]);
  };

  const saveEdit = (id) => {
    const edited = contacts.map((b) => {
      if (b.id === id) return { ...newData };
      else return b;
    });
    const editedContact = contactList.map((b) => {
      if (b.id === id) return { ...newData };
      else return b;
    });

    //console.log("index",contacts[index])
    setcontacts([...edited]);
    setEditIndex(-1);
    setNewData({});
    setContactList(editedContact);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));

  }, [contacts]);

  console.log(contacts, "bookkkk");


  const handleChange = (e) => {
    if (e.target.value) {
      const filtered = contacts.filter((item) => {
        const searchTerm = e.target.value.toLowerCase();

        return (
          item.firstName.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.lastName.toLowerCase().indexOf(searchTerm) !== -1 ||
          item.phoneNumber.toLowerCase().indexOf(searchTerm) !== -1
        );
      });
      setContactList(filtered);
      //setcontacts(filteredValues)
    } else {
      setContactList(contacts);
    }
  };

  return (
    <div className="wrapper">
      <h1>Contacts App</h1>
      <p></p>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddcontactsubmit}
          >
           <h3>Add Contact</h3>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></input>
            <br></br>
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
            <br></br>
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              ADD
            </button>
          </form>
        </div>

        <div className="view-container">
        <label for="fname">Search Contacts :</label>         
         <input  onChange={handleChange} />
          {contactList.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th> Number</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View
                      contactList={contactList}
                      deleteBook={deleteBook}
                      editBook={editBook}
                      saveEdit={saveEdit}
                      editIndex={editIndex}
                      setNewData={setNewData}
                      newData={newData}
                    />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setcontacts([])}
              >
                Remove All
              </button>
            </>
          )}
          {contacts.length < 1 && <div>No contacts are added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
