import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaBook } from "react-icons/fa";
import { LuTrainTrack } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import  useAuth  from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

export default function Home() {
  const navigate = useNavigate();
  const { whoenteredtopage,user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user,"home page user");
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Why Login is Required", href: "#login-required" },
  ];

  const personDesignation = (e) => {
    e.preventDefault();
    const person = e.target.value;
    console.log(person,"home page");
    whoenteredtopage(person);
    navigate("/login");
  };

  const services = [
    {
      title: "Periodic maintenance services",
      id: uuidv4(),
    },
    {
      title: "Car inspection and checks",
      id: uuidv4(),
    },
    {
      title: "AC service and repairs",
      id: uuidv4(),
    },
    {
      title: "Battery services",
      id: uuidv4(),
    },
    {
      title: "Dent repair and painting",
      id: uuidv4(),
    },
    {
      title: "Car detailing and spa",
      id: uuidv4(),
    },
    {
      title: "Electrical repairs",
      id: uuidv4(),
    },
    {
      title: "Tyre and wheel services",
      id: uuidv4(),
    },
  ];

  return (
    <div className="home-container">
      <nav className="nav-container">
        <div className="nav-brand">
          <img
            className="logo"
            src="https://res.cloudinary.com/dk2bbhmdm/image/upload/v1769749778/ChatGPT_Image_Jan_30_2026_10_35_46_AMlogo_hgcy8e.png"
            alt="Logo"
          /> 
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="home-content" id="home">
        <div className="login-options">
          <div className="home-page-login-container">
            <p className="please-login-para">Please login to continue</p>
            <div className="user-admit-login-container">
              <button
                value="customer"
                className="login-btn user-login"
                type="button"
                onClick={personDesignation}
              >
                Login as customer
              </button>

              <button
                value="owner"
                className="login-btn admin-login"
                type="button"
                onClick={personDesignation}
              >
                Login as owner
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="about-container" id="about">
        <div className="about-content">
          <h2 className="about-heading">About Vehicle Care</h2>
          <p className="about-para">
            Our system provides a smart and convenient way for customers to book
            vehicle service appointments online while enabling service centers
            to manage bookings and schedules efficiently.
          </p>
        </div>
      </div>
      <section className="services-container" id="services">
        <div className="services-header">
          <h2>Services</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <h3>{service.title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="choose-us" id="why-choose-us">
        <div className="choose-us-card">
          <h2>Why Choose Us</h2>
          <ul className="choose-us-un-list-container">
            <li className="list-line">Convenient online booking</li>
            <li className="list-line">Quick and simple interface</li>
            <li className="list-line">Secure user experience</li>
            <li className="list-line">Transparent service updates</li>
            <li className="list-line">Efficient service management</li>
          </ul>
        </div>
      </section>
      <section className="login-required" id="login-required">
        <div className="login-required-card">
          <h2>Why Login is Required for user</h2>
          <p className="">
            To provide a secure and reliable service experience, users are
            required to log in before accessing booking features.
          </p>
          <p>Logging in helps you:</p>
          <ul className="choose-us-un-list-container">
            <li>
              <AiFillSafetyCertificate /> Securely book service slots
            </li>
            <li>
              <CiBookmarkPlus /> Securely book service slots
            </li>
            <li>
              <FaBook /> Save and manage vehicle details
            </li>
            <li>
              <LuTrainTrack /> Track service status
            </li>
            <li>
              <FaHistory /> View booking history
            </li>
            <li>
              <GrSecure /> Protect personal data
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
