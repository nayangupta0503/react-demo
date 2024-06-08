import React, { Component } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import "./style/signup.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

  return (
    <div className="form-container">
      <label>Sign up!!</label>
      <br />
      <br />
      <form onSubmit={submit} className="register-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" id="email"/>
        </div>
        <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          id="password"
        />
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
  );
}
