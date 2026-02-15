import { useState, useEffect } from "react";
import Login from "./pages/auth/Login/index.jsx";
import NotFound from "./pages/NotFound/index.jsx";
import Register from "./pages/auth/Register/index.jsx";
import Owner from "./pages/owner/index.jsx";
import Customer from "./pages/customer/index.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import AuthContext from "./context/AuthContext/index.jsx";

const pageData = {
  whoEntered: null,
  currentUser: null,
  customer: [],
  owner: [],
};

function App() {
  const [user, setUser] = useState(pageData);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  console.log(user, "app page user");

  const login = (userData) => {
    // setUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData));
  };

  const createAccount = (userData) => {
    const existingUsersData = localStorage.getItem("user");
    const existingUserData = JSON.parse(existingUsersData);
    const updatedUserData = { ...existingUserData, currentUser: userData };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
    console.log(updatedUserData, "create account");
  };

  const whoenteredtopage = (person) => {
    const existingUsersData = localStorage.getItem("user");
    const existingUsers = JSON.parse(existingUsersData);
    const updatedUserData = { ...existingUsers, whoEntered: person };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  const logout = () => {
    setUser(pageData);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, whoenteredtopage, createAccount }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
