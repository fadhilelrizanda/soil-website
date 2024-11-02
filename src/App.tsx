import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";
import SubmitData from "./pages/SubmitData";
import "./App.css";

const LOGIN_EXPIRATION_MINUTES = 60; // 1 hour

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleLogin = (status: boolean) => {
    if (status) {
      const loginTime = new Date().getTime();
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("loginTime", loginTime.toString());
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loginTime");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    const storedLoginTime = localStorage.getItem("loginTime");

    if (storedAuthStatus === "true" && storedLoginTime) {
      const loginTime = parseInt(storedLoginTime, 10);
      const currentTime = new Date().getTime();
      const expirationTime = LOGIN_EXPIRATION_MINUTES * 60 * 1000;

      if (currentTime - loginTime < expirationTime) {
        setIsAuthenticated(true);
      } else {
        handleLogin(false); // Expired, so logout and redirect
        navigate("/login");
      }
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  // Only render routes after authentication check
  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return (
    <div className="secondary-color">
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/project/:id" element={<Project />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/add/data/:id" element={<SubmitData />} />
      </Routes>
    </div>
  );
};

export default App;
