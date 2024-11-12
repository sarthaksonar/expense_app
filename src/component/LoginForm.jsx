import React, { useState } from "react";
import FormInput from "./FormInput"; // We reuse this input for email and password
import axios from "axios";
import './LoginForm.css'; // This is where we put the pretty styles

export default function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/login", { ...user });
      console.log("1");
      localStorage.setItem('firstLogin', true);
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        // If response exists, show the error message
        alert(error.response.data.msg);
      } else {
        // Otherwise, show a generic error message
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput name="email" type="email" title="Email address" placeholder="Enter email" onChange={handleChange} />
      <FormInput name="password" type="password" title="Password" placeholder="Password" onChange={handleChange} />
      <div className="text-center">
        <button type="submit" className="btn btn-success w-100">Login</button>
      </div>
    </form>
  );
}
