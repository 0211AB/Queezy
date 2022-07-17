import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import logo from "../../Images/logo.png";

import "./Header.css";

const Header = () => {
  const [navClasses, setnavClasses] = useState("big-wrapper light");
  const [isOpen, setisOpen] = useState("false");

  const clickHandler = () => {
    setisOpen(!isOpen);
    if (isOpen) {
      setnavClasses("big-wrapper light active");
    } else setnavClasses("big-wrapper light");
  };

  return (
    <div className={navClasses}>
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h3>Queezy</h3>
        </div>

        <div className="links">
          <ul>
            <li>
              <Link to="/leaderboards">LeaderBoards</Link>
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
          <FaBars onClick={clickHandler}></FaBars>
        </div>
      </div>
    </header>
    </div>
  );
};

export default Header;
