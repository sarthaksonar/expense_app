import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState"; // Get the user info
import axios from "axios";
import './NavigationBar.css'; // Add CSS for better navigation bar design

export default function NavigationBar() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  async function handleLogout() {
    await axios.get('http://localhost:5000/user/logout');
    localStorage.clear();
    setIsLogged(false);
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Expense App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            {isLogged && (
              <li className="nav-item">
                <Link className="nav-link text-danger" onClick={handleLogout} to="/">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
