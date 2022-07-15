import { Link } from "react-router-dom";

import "./QuizBox.css";

const QuizBox = () => {
  return (<div className="box">
      <h3>basic</h3>
      <div className="price month">
        <span>$</span>10.<span>00</span>
      </div>
      <div className="price year">
        <span>$</span>30.<span>00</span>
      </div>
      <div className="list">
        <p>
          {" "}
          <i className="fas fa-check"></i> 1 person{" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> 10GB storage{" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> 1 domain{" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> team support{" "}
        </p>
        <p>
          {" "}
          <i className="fas fa-check"></i> maintenance{" "}
        </p>
      </div>
      <Link to="#" className="btn">
        choose plan
      </Link>
    </div>
  );
};

export default QuizBox;
