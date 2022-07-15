import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Header from "./Header";
import shape from "../../Images/shape.png";
import quiz from "../../Images/quiz_prev_ui.png"

const Home = () => {
  return (
    <main>
      <div class="big-wrapper light">
        <img src={shape} alt="" class="shape" />
        <Header />
        <div class="showcase-area">
          <div class="container">
            <div class="left">
              <div class="big-title">
                <h1>SignUp now to create you own quiz .</h1>
                <h1>Start Exploring now !!</h1>
              </div>
              <p class="text" type='input' >
                Enter the ID of the quiz to enter the quiz
              </p>
              <div class="cta">
                <Link to="#" class="btn">
                  Start Quiz
                </Link>
              </div>
            </div>

            <div class="right">
              <img src={quiz} alt="Quiz Image" class="person" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
