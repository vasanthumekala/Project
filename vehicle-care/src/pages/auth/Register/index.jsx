import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./index.css";

function Register() {
  const navigate = useNavigate();
  const { createAccount, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data to submit:", form);
    createAccount(form);
    navigate("/login");
  };

  return (
    <div className="registration-page">
      <div className="registration-content">
        <div className="logo-wrapper">
          <img
            src="https://res.cloudinary.com/dk2bbhmdm/image/upload/v1769749778/ChatGPT_Image_Jan_30_2026_10_35_46_AMlogo_hgcy8e.png"
            alt="Vehicle Care logo text with a car and wrench icon, calm professional tone, on a clean white background"
            className="logo"
          />
        </div>
        <div className="registration-form-wrapper">
          <div className="form-container">
            <h1 className="heading">
              Register{user?.whoEntered ? ` as ${user.whoEntered}` : ""}
            </h1>
            <form onSubmit={handleSubmit} className="form-fields-container">
              <div className="form-field">
                <label htmlFor="name" className="label">
                  Name{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="input-field"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="label">
                  Email{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="input-field"
                />
              </div>

              <div className="form-field">
                <label htmlFor="username" className="label">
                  Username{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="input-field"
                />
              </div>

              <div className="form-field">
                <label htmlFor="password" className="label">
                  Password{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="input-field"
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone" className="label">
                  Phone{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="input-field"
                />
              </div>

              <div className="form-field">
                <label htmlFor="address" className="label">
                  Address{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-field">
                <label htmlFor="profileImage" className="label">
                  Profile Image
                </label>
                <input
                  className="input-field"
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
