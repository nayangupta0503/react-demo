import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            // Create a query to check if the email and password match
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email), where('password', '==', password));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
            // If a document is found, authentication is successful
            alert('User authenticated successfully.');
            } else {
            // If no document is found, authentication fails
            alert('Invalid email or password.');
            }
        } catch (e) {
            console.error('Error querying Firestore: ', e);
            alert('Error during authentication.');
        }
    };

  return (
    <div className='form-container'>
      <h1>Login Form</h1><br /><br />
      <form onSubmit={handleLogin} className='register-form'>
        <div className='form-group'> 
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className='submit-button'>Login</button>
      </form><br /><br />
      <label>
        New User?
        <a href="/">
          <button>Register</button>
        </a>
      </label>
    </div>
  )
}

export default LoginForm
