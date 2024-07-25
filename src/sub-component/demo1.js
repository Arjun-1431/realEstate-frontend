import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contect, setContect] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [personId, setPersonId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://realestate-backend-k9l8.onrender.com/api/createUser', {
        name,
        email,
        password,
        contect,
        isAdmin
      });
      const { message } = response.data;
     
      setPersonId(response.data.personId);
      alert(message);
    } catch (error) {
      alert('Error registering user: ' + error.message); 
    }
  };

  return (
    <div style={{marginTop:80}}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={contect} onChange={(e) => setContect(e.target.value)} placeholder="Contact" />
        <label>
          Admin:
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </label>
        <button type="submit">Register</button>
      </form>
      {personId && <p>Person ID: {personId}</p>}
    </div>
  );
};

export default RegisterForm;
