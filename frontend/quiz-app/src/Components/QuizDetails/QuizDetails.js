import React, { useState, useEffect } from "react";
import "./QuizDetails.css";
import instructions from "../../Images/ins2.svg";
import { useParams, useNavigate } from "react-router-dom";

const QuizDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    const newData={
        ...data,
        name
    }
    setData(newData)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    var storedQIDs = JSON.parse(localStorage.getItem("qids"));

    if (storedQIDs === null) {
      var qids = [];
      qids[0] = params.qid;
      localStorage.setItem("qids", JSON.stringify(qids));
      const val={data}
      console.log(val)
      navigate(`/qid/${params.qid}`, { state:val });
    } else if (storedQIDs.includes(`${params.qid}`))
      alert("You Have Already taken the quiz.");
    else {
      storedQIDs.push(`${params.qid}`);
      localStorage.setItem("qids", JSON.stringify(storedQIDs));
      navigate(`/qid/${params.qid}`, { state: data });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/quiz/${params.qid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datares = await res.json();
      //console.log(datares);
      setData(datares);
    };

    fetchData();
  }, []);

  if (data != null) {
    return (
      <div className="showcase-area bgColor">
        <div className="container">
          <div className="leftP">
            <div className="big-title">
              <h1>Instructions for the Quiz</h1>
              <h5>The quiz will be of {data.time} mins duration. </h5>
              <h5>The quiz will be open till {data.expiry.split("T")[0]} </h5>
              <h5>You can attempt the quiz only once.</h5>
              <h5>There are a total {Math.min(data.amount, 50)} questions. </h5>
              <h5>Each question carries one mark. </h5>
              <h5> No negative marking for wrong answers.</h5>
              <h5>Questions are of Multiple Choice. </h5>
              <h5>Click Start Test to attempt the quiz. </h5>
              <h5>Click on Submit Test button on completion of the quiz. </h5>
              <h5>
                The time will start the moment you click the Start Quiz button.
              </h5>
              <h5>
                Any candidate caught using unfair means will be removed from the
                quiz.
              </h5>
            </div>
            <form className="quiz-id-form2" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter your name"
                className="placeholder"
                onChange={nameChangeHandler}
                required
              />
              <input
                type="submit"
                value="Start Quiz"
                className="btn start-btn"
              />
            </form>
          </div>

          <div className="rightP">
            <img src={instructions} alt="Quiz Image" />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default QuizDetails;
