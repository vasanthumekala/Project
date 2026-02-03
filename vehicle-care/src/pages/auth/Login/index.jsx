import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import "./index.css";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your login logic
  }

  return (
    <div className="login-container">
      <form className="Form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <div className="input-wrapper">
            <MdEmail className="input-icon" aria-hidden="true" />
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
