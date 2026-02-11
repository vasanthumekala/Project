import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav>
        <div>
          <img
            src="https://res.cloudinary.com/dk2bbhmdm/image/upload/v1769749778/ChatGPT_Image_Jan_30_2026_10_35_46_AMlogo_hgcy8e.png"
            alt="Logo"
          />
        </div>
        <div className="nav-links">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </div>
      </nav>
      <div className="home-content">
        <h1>Vehicle Care System</h1>

        <div className="login-options">
          <p>Select your role to continue</p>
          <div>
            <button
              className="login-btn user-login"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login as User
            </button>

            <button
              className="login-btn admin-login"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login as Admin
            </button>
            <button type="button" className="btn btn-warning">
              warning
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
