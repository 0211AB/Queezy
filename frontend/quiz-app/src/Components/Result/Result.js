import React, { useState, useEffect } from "react";
import "./Result.css";
import rating from "../../Images/rating.svg";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const Result = (props) => {
  const params = useParams;
  const { state } = useLocation();
  const qid = state.savedRes.quiz;
  const navigate = useNavigate();
  const [rating, setRating] = useState(3);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const rBody = { rating };
      const res = await fetch(`http://localhost:8000/quiz/rating/${qid}`, {
        method: "POST",
        body: JSON.stringify(rBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datares = await res.json();

      navigate("/", { replace: true });
      //console.log(datares);
    };
    if (exit === true) fetchData();
  }, [exit]);

  const ratingChangeHandler = (e) => {
    setRating(e.target.value);
  };

  const submitHandler = (e) => {
    setExit(true);
  };

  const exithandler = () => {
    setExit(true);
  };

  return (
    <div className="popup-containerx">
      <div className="popupx">
        <h3>
          How satisfying was the quiz experience?<br></br>View your performance
          in the leaderboard
        </h3>

        <input
          type="radio"
          name="buttons"
          id="btn1"
          value="1"
          onClick={ratingChangeHandler}
        />
        <input
          type="radio"
          name="buttons"
          id="btn2"
          value="2"
          onClick={ratingChangeHandler}
        />
        <input
          type="radio"
          name="buttons"
          id="btn3"
          value="3"
          onClick={ratingChangeHandler}
        />
        <input
          type="radio"
          name="buttons"
          id="btn4"
          value="4"
          onClick={ratingChangeHandler}
        />
        <input
          type="radio"
          name="buttons"
          id="btn5"
          value="5"
          onClick={ratingChangeHandler}
        />

        <div className="iconsx">
          <label htmlFor="btn1">🙁</label>
          <label htmlFor="btn2">😐</label>
          <label htmlFor="btn3">😊</label>
          <label htmlFor="btn4">😀</label>
          <label htmlFor="btn5">😍</label>
        </div>

        <input type="submit" onClick={submitHandler} className="btn" />

        <div onClick={exithandler} id="closex">
          ✖
        </div>
      </div>
    </div>
  );
};

export default Result;
