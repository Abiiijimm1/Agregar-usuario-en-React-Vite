// src/App.jsx
import React, { useState } from 'react';
import './styles.css';

const maleImageURL = 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg';
const femaleImageURL = 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png';

function UserItem({ user, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <img src={user.gender === 'male' ? maleImageURL : femaleImageURL} alt={user.gender} />
          <span>{user.name}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <ul>
      {users.map((user, index) => (
        <UserItem
          key={index}
          user={user}
          onEdit={(name) => onEditUser(index, name)}
          onDelete={() => onDeleteUser(index)}
        />
      ))}
    </ul>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  const handleInputChange = (event) => {
    setNewUserName(event.target.value);
  };

  const handleAddUser = () => {
    if (newUserName.trim() !== '') {
      // Verificar si el nombre ya existe
      const isDuplicate = users.some(user => user.name.toLowerCase() === newUserName.trim().toLowerCase());
      if (isDuplicate) {
        alert('El usuario ya existe.');
      } else {
        // Determinar el género del usuario (solo como ejemplo, puedes tener una forma más precisa de determinar el género)
        const gender = newUserName.toLowerCase().includes('maria') ? 'female' : 'male';
        
        // Agregar el nuevo usuario con la imagen correspondiente
        setUsers([...users, { name: newUserName.trim(), gender }]);
        setNewUserName('');
      }
    }
  };

  const handleEditUser = (index, newName) => {
    const updatedUsers = [...users];
    updatedUsers[index].name = newName;
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={newUserName} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddUser}>Add User</button>
      <h2>Existing Users</h2>
      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default App;
