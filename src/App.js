import React, { useState } from 'react';
import './App.css';
import data from './data.json';
import ReadOnlyRow from './componenets/ReadOnlyRow';
import EditRows from './componenets/EditRows';

function App() 
{
//store the data in the state
const [users, setUsers] = useState(data);

const initialValue ={
  id: '',
  firstName: '',
  lastName: ''
}
//get data from 'add user' form
const [addFormData, setAddFormData] = useState(initialValue)

//set message for success or failure
const [addingMessage, setAddingMessage] = useState(`I'm waiting...`);

//edit user input data
const [editFormData, setEditFormData] = useState({
  id: '',
  firstName: '',
  lastName: ''
})

//edit user
const [editUserId, setEditUserId] = useState(null);

//manage the input data by the state
const handleAddFormChange = (event) => 
{
  event.preventDefault();

  //get the name attribute from the inputs
  const fieldName = event.target.getAttribute('name');
  //get the values
  const fieldValue = event.target.value;
  //make copy of the existing form data
  const newFormData = {...addFormData};
  //update the data with the new value
  newFormData[fieldName] = fieldValue;
  //set into state, call the set function
  setAddFormData(newFormData);
}

//manage editing input data by the state
const handleEditFormChange = (event) => 
{
  event.preventDefault();

  //get the name attribute from the inputs
  const fielsName = event.target.getAttribute('name');
  //get the values
  const fieldValue = event.target.value;
  //make copy of the existing form data
  const newFormData = {...editFormData};
  //update the data with the new value
  newFormData[fielsName] = fieldValue;
  //set into state, call the set function
  setEditFormData(newFormData);
}

//handle the new user adding when submit
const handleAddFormSubmit = (event) =>
{
  event.preventDefault();

  //take the input data and make a new object
  const newUser = 
  {
    id: addFormData.id,
    firstName: addFormData.firstName,
    lastName: addFormData.lastName
  }
  //check for duplicated id
  if(users.find(users => users.id === newUser.id))
  {
    setAddingMessage('ID is alredy exsist');
    return;
  }
  //create a new users array
  const newUsers = [...users, newUser];
  //call the function and set a new array
  setUsers(newUsers);
  setAddingMessage('User added successfully!');
  setAddFormData(initialValue);
}

//handle the edited user adding when submit
const handleEditedFormSubmit = (event) =>
{
  event.preventDefault();

  //take the input data and make a new object
  const editedUser = 
  {
    id: editUserId,
    firstName:editFormData.firstName,
    lastName: editFormData.lastName
  }
  
  //create a new users array
  const newUsers = [...users];
  //get the index of the editing row
  const index = users.findIndex((user) => user.id === editUserId);
  //update the array in the correct position
  newUsers[index] = editedUser;
  //call the function and set a new array
  setUsers(newUsers);
  setEditUserId(null);
}

//handle the edit button
const handleEditClick = (event, user) =>
{
  event.preventDefault();
  //set the edit
  setEditUserId(user.id);
  //make edit object
  const formValues = 
  {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName
  }
  //set edited data
  setEditFormData(formValues);
}

//make an cancel option for editing
const handleCancelClick = () => 
{
  setEditUserId(null);
}

//handle the delete user option
const handleDeleteClick = (userId) =>
{
  //create new array
  const newUsers = [...users];
  //find the index you want to delete
  const index = users.findIndex((user) => user.id === userId)
  //remove the chosen row
  newUsers.splice(index, 1);
  //save changes into state
  setUsers(newUsers);
}

  return (
    <div className="app-container">
      <h1>CRUD TABLE</h1>
      <h2>Create Read Update and Delete</h2>
      <form onSubmit={handleEditedFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => 
              <>
                {
                  //if id matches, show edit version, otherwise: show row data
                  editUserId === user.id ? 
                  <EditRows 
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  /> : 
                  <ReadOnlyRow
                    key={user.id}
                    user={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                }
              </>)
            }
          </tbody>
        </table>
      </form>
      <form onSubmit={handleAddFormSubmit} className="adding-form" >
        <h2>Add new user</h2>
        <input 
          type='text' 
          name='id' 
          placeholder='Enter your ID' 
          required 
          onChange={handleAddFormChange}
          value={addFormData.id}
        />
        <input 
          type='text' 
          name='firstName' 
          placeholder='Enter your first name' 
          required 
          onChange={handleAddFormChange}
          value={addFormData.firstName}
        />
        <input 
          type='text' 
          name='lastName' 
          placeholder='Enter your last name' 
          required 
          onChange={handleAddFormChange}
          value={addFormData.lastName}
        />
        <button type='submit'>SEND</button>
        <div id='message'>{addingMessage}</div>
      </form>
    </div>
  );
}

export default App;
