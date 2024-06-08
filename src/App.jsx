import React, { Component }  from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './style/style.css';
export default function App() {
  const inputStyle = {
  backgroundColor: '#fff', // White background
  border: '2px solid #000', // Black border
  padding: '10px', // Padding for space inside the input
  fontSize: '16px', // Font size for readability
  color: '#000', // Text color
  outline: 'none', // Remove the default outline
  width: '300px', // Increase width
  height: '30px', // Remove the default outline
};

const submit = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Add a new document in the "users" collection
    await addDoc(collection(db, 'users'), {
      email: email,
      password: password,
    });
    alert(`Email: ${email}\nPassword: ${password}\nData stored in Firestore.`);
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('Error storing data in Firestore.');
  }
};

  return (
    <>
    <form onSubmit={submit}>
     Email <input style={inputStyle} type="email" id="email"/><br />
     Password <input style={inputStyle} type="password" id="password"/><br /><br />
     <button type='submit' id='submit'>Submit</button>
    </form>
    </>
  )
}