import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Owner() {
  const [ownerData, setOwnerData] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedOwnerData = localStorage.getItem("user");
  //   if (savedOwnerData) {
  //     setOwnerData(JSON.parse(savedOwnerData));
  //   }
  // }, []);

  console.log(user, "owner page user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    setOwnerData(null);
    navigate("/");
  };
  return (
    <div className="owner-container">
      <div className="owner-content">
        <nav className="nav-container">
          <div className="nav-brand">
          <img
            className="logo"
            src="https://res.cloudinary.com/dk2bbhmdm/image/upload/v1769749778/ChatGPT_Image_Jan_30_2026_10_35_46_AMlogo_hgcy8e.png"
            alt="Logo"
          />
        </div>
        </nav>
        <h1>
          Owner Page{user?.currentUser ? ` as ${user.currentUser.name}` : ""}
        </h1>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
