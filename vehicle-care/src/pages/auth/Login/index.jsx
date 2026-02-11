import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (
        response.data?.matched === false ||
        response.data?.success === false
      ) {
        setError(response.data?.message || "Invalid email or password.");
        return;
      }

      navigate("/n");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setError(message);
    }
  }

  return (
    <div className="login-container">
      <form className="Form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        {error ? <p className="error-text">{error}</p> : null}

        <button className="button" type="submit">
          Login
        </button>

        <p className="helper-text">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
