import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const res = state.data;
  //console.log(res);
  const secs = res.time.split(":")[1] ? res.time.split(":")[1] : 59;
  const mins =
    secs === 59 ? res.time.split(":")[0] - 1 : res.time.split(":")[0];
  const length = Math.min(res.amount, 50);
  const name = res.name;
  const [prevDate, setPrevDate] = useState(Date.now());
  const [ques, setques] = useState(0);
  const [options, setoptions] = useState([]);
  const [question, setquestion] = useState("");
  const [answers, setanswers] = useState({});
  const [times, setTimes] = useState({});
  const [results, setResults] = useState(null);

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  useEffect(() => {
    async function sendResults() {
      const res = await fetch("http://localhost:8000/result-score", {
        method: "POST",
        body: JSON.stringify(results),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datares = await res.json();
      console.log(datares)

      if (res.status === 400) {
        alert(`${JSON.stringify(datares.Error)}`);
      }

      if (res.status === 201) {
        navigate(`/results/${datares.savedRes._id}`, { state:datares, replace: true });
      }
    }

    if (results !== null) sendResults();
  }, [results]);

  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&#34;": "'",
    "&#034;": '"',
    "&#60;": "<",
    "&#060;": "<",
    "&#62;": ">",
    "&#062;": ">",
    "&amp;": "&",
    "&#38;": "&",
    "&#038;": "&",
  };

  //const style = { color: "#fff", fontSize: "1.1em" }

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      res.questions[i].question = res.questions[i].question.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.questions[i].correct_answer = res.questions[i].correct_answer.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.questions[ques].incorrect_answers = res.questions[
        ques
      ].incorrect_answers.map((x) =>
        x.replace(/&#?\w+;/g, (match) => entities[match])
      );
    }
  }, []);

  useEffect(() => {
    setquestion(res.questions[ques].question);
    setoptions([
      res.questions[ques].correct_answer,
      ...res.questions[ques].incorrect_answers,
    ]);
    shuffleArray(options);
  }, [ques]);

  const nextHandler = (e) => {
    if (ques !== length - 1) setques(ques + 1);
  };

  const prevHandler = (e) => {
    if (ques !== 0) setques(ques - 1);
  };

  const submitHandler = (e) => {
    var score = 0,
      questionsCorrect = [];
    for (let i = 0; i < length; i++) {
      if (answers[i] == res.questions[i].correct_answer) {
        score += 1;
        questionsCorrect.push(i + 1);
      }
    }

    // console.log(times);
    // console.log(score);
    // console.log(questionsCorrect);
    setResults({ times, score, questionsCorrect, id: res._id, name });
  };

  const changeclass = (e) => {
    var domele = e.nativeEvent.path;
    domele = domele.reverse();
    const ele = domele.reverse()[0];

    for (let ele of domele) {
      if (ele.id === "options") {
        for (let ans of ele.childNodes) ans.classList = "option";

        break;
      }
    }

    ele.classList.add("active");
    const ans = e.target.innerHTML;
    const time = Date.now() - prevDate;
    setTimes({
      ...times,
      [ques]: time + (times[ques] === undefined ? 0 : times[ques]),
    });
    setPrevDate(Date.now());
    setanswers({ ...answers, [ques]: ans });
    //console.log(times);
    //console.log(answers);
  };

  return (
    <div className="wrapper">
      <div className="quiz">
        <div className="quiz_header">
          <div className="quiz_user">
            <h3>
              Welcome! {name}
              <span className="name"></span>
            </h3>
          </div>
          <div className="quiz_timer">
            <span className="time">
              {mins}:{secs}
            </span>
          </div>
        </div>
        <div className="quiz_body">
          <div id="questions">
            <h3>
              Question {ques + 1}/{length} <br></br>
              {question}
              <span className="name"></span>
            </h3>
          </div>
          <ul className="option_group" id="options">
            {options.map((option, index) => (
              <li
                className="option"
                key={index}
                data_key={index}
                onClick={changeclass}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="right-side">
            <button className="btn-next" onClick={prevHandler}>
              Previous Question
            </button>
            <button className="btn-next btn-submit" onClick={submitHandler}>
              Submit
            </button>
            <button className="btn-next" onClick={nextHandler}>
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
