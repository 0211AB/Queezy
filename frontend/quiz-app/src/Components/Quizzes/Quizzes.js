import Header from "../Home/Header";
import "./Quizzes.css";

import shape from "../../Images/shape.png";
import QuizBox from "./QuizBox";

const Quizzes = () => {
  return (
    <div className="big-wrapper light">
      <img src={shape} alt="" className="shape" />
      <Header />
      <div className="container">
      <div className="big-title quizzes-title">
        <h1>All upcoming quizzes...</h1>
      </div>
      </div>
      <div className="box-container">
        <QuizBox />
        <QuizBox />
        <QuizBox />
      </div>
    </div>
  );
};

export default Quizzes;
