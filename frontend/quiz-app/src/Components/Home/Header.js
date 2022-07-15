import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import logo from "../../Images/logo.png";

import "./Header.css";

const Header = () => {
  const [navClasses, setnavClasses] = useState("nav");
  const [isOpen, setisOpen] = useState("false");

  const clickHandler = () => {
    setisOpen(!isOpen);
    if (isOpen) {
      setnavClasses("nav nav-toggle");
    } else setnavClasses("nav");
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h3>Queezy</h3>
        </div>

        <div className="links">
          <ul>
            <li>
              <Link to="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/quizzes">Upcoming Quizzes</Link>
            </li>
            <li>
              <Link to="/admin/signup" className="btn">
                Sign up
              </Link>
            </li>
          </ul>
        </div>

        <div className="overlay"></div>

        <div className="hamburger-menu">
          <FaBars className="bar" onClick={clickHandler}></FaBars>
        </div>
      </div>
    </header>
  );
};

export default Header;
