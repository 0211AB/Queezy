import { Link } from "react-router-dom";

import "./QuizBox.css";

const QuizBox = (props) => {
  //console.log(props)
  return (
    <div className="qbox">
      <h3>{props.data.uuid}</h3>
      <div className="price month">
        <span>Creator ID <br></br>{props.data.creator.substring(0,10)}</span>
      </div>
      <div className="list">
        <p>
          {" "}
          <i className="fas fa-check"></i>Duration : {props.data.time} mins{" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i>Number of question : {props.data.amount} {" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> Created On : {props.data.createdAt.split('T')[0]} {" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> Expires On : {props.data.expiry.split('T')[0]}{" "}
        </p>
      </div>
      <Link to={`/quiz/${props.data.uuid}`} className="btn">
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizBox;
