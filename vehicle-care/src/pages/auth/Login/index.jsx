import React, { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const { login,user } = useAuth();
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
    login(formData);
    const existingUser = user?.whoEntered;
    console.log(existingUser,"login page user");
    navigate(`/${existingUser}`);
  
    // try {
    //   const response = await axios.post("/api/login", {
    //     email: formData.email,
    //     password: formData.password,
    //   });

    //   if (
    //     response.data?.matched === false ||
    //     response.data?.success === false
    //   ) {
    //     setError(response.data?.message || "Invalid email or password.");
    //     return;
    //   }

    //   // Save user data to context so the whole app knows who's logged in
    //   login(response.data.user);

    //   navigate("/");
    // } catch (err) {
    //   const message =
    //     err.response?.data?.message ||
    //     "Login failed. Please check your credentials and try again.";
    //   setError(message);
    // }
  }

  return (
    <div className="login-container">
      <form className="Form-container" onSubmit={handleSubmit}>
        <h2>Login {user?.whoEntered ? `as ${user.whoEntered}` : ""}</h2>

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
          <div className="input-wrapper">
            <FaLock className="input-icon" aria-hidden="true" />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
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

export default Login;
