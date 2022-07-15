import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import Header from "./Header";
import shape from "../../Images/shape.png";
import quiz from "../../Images/quiz_prev_ui.png";

const Home = () => {
  const [qid, setqid] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const qidChangeHandler = (e) => {
    setqid(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setData({
      quizId: qid,
    });
  };

  useEffect(() => {
    const sendData = async () => {
      const res = await fetch("http://localhost:8000/quiz/:qid", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const quizRes = await res.json();

      if (res.status === 400) {
        navigate(`/quiz/${quizRes.qid}`)
      }

      if (res.status === 200) {
        navigate(`/quiz/${quizRes.qid}`);
      }
    };

    if (data !== null) sendData();
  }, [data]);

  return (
    <main>
      <div className="big-wrapper light">
        <img src={shape} alt="" className="shape" />
        <Header />
        <div className="showcase-area">
          <div className="container">
            <div className="left">
              <div className="big-title">
                <h1>SignUp now to create you own quiz .</h1>
                <h1>Start Exploring now !!</h1>
              </div>
              <form className="quiz-id-form" onSubmit={submitHandler}>
                <div>
                  <input
                    type="text"
                    value={qid}
                    placeholder="Enter Quiz ID"
                    onChange={qidChangeHandler}
                    required
                  />
                  <input
                    type="submit"
                    value="Start Quiz"
                    className="btn btn-form"
                  />
                </div>
              </form>
            </div>

            <div className="right">
              <img src={quiz} alt="Quiz Image" className="person" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
