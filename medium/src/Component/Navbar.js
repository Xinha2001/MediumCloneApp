import React from 'react';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    setIsAuthenticated(!!jwtToken);
  }, [jwtToken]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.clear();
    setIsAuthenticated(false);
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="logo" href="/">Medium</a>
        <div className="menu">
        <a href="/myprofile"> View profile</a>
        <a href="/mypost">Posts</a>
         <a href="/savedpost">Saved Posts</a>
         <a href="/draft">Draft</a>
          <a href="/payment">GO PRO!</a>
          <a href="/">Home</a>
          <a href="/add">Aricle</a>
          {isAuthenticated ? (
                    <a onClick={handleLogout}>Logout</a>
                  ) : (
                    <>
                      <a onClick={handleLogin}>Login</a>
                      <a onClick={handleRegister}>Register</a>
                    </>
                  )}
       </div>
      </div>
    </nav>
  );
};

export default Navbar;