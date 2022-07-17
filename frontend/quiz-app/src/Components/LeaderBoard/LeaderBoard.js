import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";

const LeaderBoard = (props) => {
  //console.log(props.state);
  const [quiz, setQuiz] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const quizChangeHandler = (e) => {
    setQuiz(e.target.value);
  };

  const submitHandler = () => {
    setData(quiz);
    navigate('/leaderboard')
  };

//   useEffect(() => {
//     const send = { id: data };
//     const sendData = async () => {
//       const res = await fetch("http://localhost:8000/test-data", {
//         method: "POST",
//         body: JSON.stringify(send),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const resP = await res.json();
//       console.log(res.json());
//       console.log(resP);

//       if (res.status === 400) {
//         alert("No such quiz found");
//         navigate("/leaderboards");
//       }

//       if (res.status === 200) {
//         navigate("/leaderboard", { state: resP });
//       }

//       setData(null);
//     };

//     if (data !== null) sendData();
//   }, [data]);

  return (
    <>
      <div className="container ">
        <Header />
        <div className="big-title quizzes-title">
          <h1 className="centered">LeaderBoards</h1>
        </div>
      </div>
      <form className="quiz-id-form2" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter QuizID"
          className="placeholder"
          onChange={quizChangeHandler}
          required
        />
        <input
          type="submit"
          value="Search LeaderBoard"
          className="btn start-btn"
        />
      </form>
    </>
  );
};

export default LeaderBoard;
