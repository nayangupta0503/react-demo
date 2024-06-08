import React, { useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const submit = async (event) => {
    event.preventDefault();

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      return;
    }
    const email = document.getElementById("email").value;

    try {
      // Create a query to check if the email already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a document with the same email is found, alert the user and do not add the document
        alert("A user with this email already exists.");
      } else {
        // If no document is found, proceed to add a new document
        await addDoc(collection(db, "users"), {
          email: email,
          password: password,
        });
        alert("User added successfully.");
        navigate("/login");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error storing data in Firestore.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className="form-container">
      <label>Sign up!!</label>
      <br />
      <br />
      <form onSubmit={submit} className="register-form">
        <div className="form-group">
          <label>Email
          <input type="email" id="email"/>
          </label>
        </div>
        <div className="form-group password-group">
        <label>Password</label>
        <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) =>{ 
            setPassword(e.target.value);
            setPasswordError('');
          }}
          required
          />
        <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </button>
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button className="submit-button" type="submit" id="submit">
          Register
        </button>
      </form>
      <br />
      <br />
      <label>
        already user?{" "}
        <a href="/login">
          <button>log in</button>
        </a>
      </label>
    </div>

    <input type="password" id="pass"/>

    </>
  );
}
