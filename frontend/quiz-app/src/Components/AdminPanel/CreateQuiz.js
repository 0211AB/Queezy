import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import "./CreateQuiz.css";

const CreateQuiz = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [data, setData] = useState(null);

  const [q1, setq1] = useState("");
  const [q1C, setq1C] = useState("");
  const [q1IC1, setq1IC1] = useState("");
  const [q1IC2, setq1IC2] = useState("");
  const [q1IC3, setq1IC3] = useState("");

  const [q2, setq2] = useState("");
  const [q2C, setq2C] = useState("");
  const [q2IC1, setq2IC1] = useState("");
  const [q2IC2, setq2IC2] = useState("");
  const [q2IC3, setq2IC3] = useState("");

  const [q3, setq3] = useState("");
  const [q3C, setq3C] = useState("");
  const [q3IC1, setq3IC1] = useState("");
  const [q3IC2, setq3IC2] = useState("");
  const [q3IC3, setq3IC3] = useState("");

  const [q4, setq4] = useState("");
  const [q4C, setq4C] = useState("");
  const [q4IC1, setq4IC1] = useState("");
  const [q4IC2, setq4IC2] = useState("");
  const [q4IC3, setq4IC3] = useState("");

  const [q5, setq5] = useState("");
  const [q5C, setq5C] = useState("");
  const [q5IC1, setq5IC1] = useState("");
  const [q5IC2, setq5IC2] = useState("");
  const [q5IC3, setq5IC3] = useState("");


  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };

  const expiryChangeHandler = (e) => {
    setExpiry(e.target.value);
  };

  const q1changeHandler = (e) => {
    setq1(e.target.value);
  };

  const q1CchangeHandler = (e) => {
    setq1C(e.target.value);
  };

  const q1IC1changeHandler = (e) => {
    setq1IC1(e.target.value);
  };

  const q1IC2changeHandler = (e) => {
    setq1IC2(e.target.value);
  };

  const q1IC3changeHandler = (e) => {
    setq1IC3(e.target.value);
  };

  const q2changeHandler = (e) => {
    setq2(e.target.value);
  };

  const q2CchangeHandler = (e) => {
    setq2C(e.target.value);
  };

  const q2IC1changeHandler = (e) => {
    setq2IC1(e.target.value);
  };

  const q2IC2changeHandler = (e) => {
    setq2IC2(e.target.value);
  };

  const q2IC3changeHandler = (e) => {
    setq2IC3(e.target.value);
  };

  const q3changeHandler = (e) => {
    setq3(e.target.value);
  };

  const q3CchangeHandler = (e) => {
    setq3C(e.target.value);
  };

  const q3IC1changeHandler = (e) => {
    setq3IC1(e.target.value);
  };

  const q3IC2changeHandler = (e) => {
    setq3IC2(e.target.value);
  };

  const q3IC3changeHandler = (e) => {
    setq3IC3(e.target.value);
  };

  const q4changeHandler = (e) => {
    setq4(e.target.value);
  };

  const q4CchangeHandler = (e) => {
    setq4C(e.target.value);
  };

  const q4IC1changeHandler = (e) => {
    setq4IC1(e.target.value);
  };

  const q4IC2changeHandler = (e) => {
    setq4IC2(e.target.value);
  };

  const q4IC3changeHandler = (e) => {
    setq4IC3(e.target.value);
  };

  const q5changeHandler = (e) => {
    setq5(e.target.value);
  };

  const q5CchangeHandler = (e) => {
    setq5C(e.target.value);
  };

  const q5IC1changeHandler = (e) => {
    setq5IC1(e.target.value);
  };

  const q5IC2changeHandler = (e) => {
    setq5IC2(e.target.value);
  };

  const q5IC3changeHandler = (e) => {
    setq5IC3(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const q1Data = {
      question: q1,
      correct_answer: q1C,
      incorrect_answers: [q1IC1, q1IC2, q1IC3],
    };
    const q2Data = {
      question: q2,
      correct_answer: q2C,
      incorrect_answers: [q2IC1, q2IC2, q2IC3],
    };
    const q3Data = {
      question: q3,
      correct_answer: q3C,
      incorrect_answers: [q3IC1, q3IC2, q3IC3],
    };
    const q4Data = {
      question: q4,
      correct_answer: q4C,
      incorrect_answers: [q4IC1, q4IC2, q4IC3],
    };
    const q5Data = {
      question: q5,
      correct_answer: q5C,
      incorrect_answers: [q5IC1, q5IC2, q5IC3],
    };
    setData({
      creator: params.id,
      amount: 5,
      topic: "Random",
      time,
      expiry,
      questions: [q1Data,q2Data,q3Data,q4Data,q5Data],
    });

    console.log(data);
  };

  useEffect(() => {
    const sendData = async () => {
      const res = await fetch("http://localhost:8000/admin/create-test", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      const datares = await res.json();

      if (datares.code === 11000) {
        alert(`${JSON.stringify(datares.keyValue)} aldready exists!!`);
      }

      if (res.status === 404) {
        alert(`${JSON.stringify(datares._message)}`);
      }

      if (res.status === 201) {
        navigate(`/admin/tests/${params.id}`);
      }
    };

    if (data !== null) sendData();
  }, [data]);

  return (
    <div className="no-scroll">
      <div className="big-title">
        <h2 className="centered">Fill In the details to generate a quiz !!</h2>
      </div>
      <form className="sign-in-form" onSubmit={submitHandler}>
        <div className="input-field">
          
        <i className="fas fa-lock"></i>
          <input
            type="text"
            placeholder="Time Duration (Mins)"
            onChange={timeChangeHandler}
            required
          />
        </div>
        <div className="input-field">
        <i className="fas fa-lock"></i>
          <input
            type="date"
            placeholder="Expiry"
            onChange={expiryChangeHandler}
            required
          />
        </div>
        <br></br>
        <br></br>
        <div className="questions-div">
          <input
            className="q-input"
            required
            type="text"
            placeholder="Enter Question Number 1"
            onChange={q1changeHandler}
          ></input>
          <div className="q-box-ans">
            <input
              className="q-input correct1"
              type="text"
              placeholder="Enter Correct Option"
              onChange={q1CchangeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q1IC1changeHandler}
            ></input>
          </div>
          <div className="q-box-ans">
            <input
              className="q-input"
              required
              placeholder="Enter Inorrect Option"
              type="text"
              onChange={q1IC2changeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q1IC3changeHandler}
            ></input>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="questions-div">
          <input
            className="q-input"
            required
            type="text"
            placeholder="Enter Question Number 2"
            onChange={q2changeHandler}
          ></input>
          <div className="q-box-ans">
            <input
              className="q-input correct1"
              type="text"
              placeholder="Enter Correct Option"
              onChange={q2CchangeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q2IC1changeHandler}
            ></input>
          </div>
          <div className="q-box-ans">
            <input
              className="q-input"
              required
              placeholder="Enter Inorrect Option"
              type="text"
              onChange={q2IC2changeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q2IC3changeHandler}
            ></input>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="questions-div">
          <input
            className="q-input"
            required
            type="text"
            placeholder="Enter Question Number 3"
            onChange={q3changeHandler}
          ></input>
          <div className="q-box-ans">
            <input
              className="q-input correct1"
              type="text"
              placeholder="Enter Correct Option"
              onChange={q3CchangeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q3IC1changeHandler}
            ></input>
          </div>
          <div className="q-box-ans">
            <input
              className="q-input"
              required
              placeholder="Enter Inorrect Option"
              type="text"
              onChange={q3IC2changeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q3IC3changeHandler}
            ></input>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="questions-div">
          <input
            className="q-input"
            required
            type="text"
            placeholder="Enter Question Number 4"
            onChange={q4changeHandler}
          ></input>
          <div className="q-box-ans">
            <input
              className="q-input correct1"
              type="text"
              placeholder="Enter Correct Option"
              onChange={q4CchangeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q4IC1changeHandler}
            ></input>
          </div>
          <div className="q-box-ans">
            <input
              className="q-input"
              required
              placeholder="Enter Inorrect Option"
              type="text"
              onChange={q4IC2changeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q4IC3changeHandler}
            ></input>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="questions-div">
          <input
            className="q-input"
            required
            type="text"
            placeholder="Enter Question Number 5"
            onChange={q5changeHandler}
          ></input>
          <div className="q-box-ans">
            <input
              className="q-input correct1"
              type="text"
              placeholder="Enter Correct Option"
              onChange={q5CchangeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q5IC1changeHandler}
            ></input>
          </div>
          <div className="q-box-ans">
            <input
              className="q-input"
              required
              placeholder="Enter Inorrect Option"
              type="text"
              onChange={q5IC2changeHandler}
            ></input>
            <input
              className="q-input"
              required
              type="text"
              placeholder="Enter Inorrect Option"
              onChange={q5IC3changeHandler}
            ></input>
          </div>
        </div>

        <input
          class="btn create-test-btn"
          type="submit"
          value="Create Test"
        ></input>
      </form>
    </div>
  );
};

export default CreateQuiz;
