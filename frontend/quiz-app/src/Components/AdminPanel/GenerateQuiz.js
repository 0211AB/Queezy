import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import "./GenerateQuiz.css";

const topics = [
  { id: 1, name: "Select category" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

const GenerateQuiz = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [topic, setTopic] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [data, setData] = useState(null);

  const topicChangeHandler = (e) => {
    setTopic(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };

  const expiryChangeHandler = (e) => {
    setExpiry(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setData({
      id: params.id,
      topic,
      expiry,
      time,
      amount,
    });
  };

  useEffect(() => {
    const sendData = async () => {
      const res = await fetch("http://localhost:8000/admin/generate-test", {
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

      if (res.status === 201) {
        navigate(`/admin/tests/${params.id}`);
      }
    };

    if (data !== null) sendData();
  }, [data]);

  return (
    <>
      <div className="big-title">
        <h2 className="centered">Fill In the details to generate a quiz !!</h2>
      </div>
      <form className="sign-in-form" onSubmit={submitHandler}>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <select onChange={topicChangeHandler} required>
            {topics.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="number"
            placeholder="Enter Number of Questions"
            onChange={amountChangeHandler}
            required
          />
        </div>
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
        <input className="btn create-test-btn" type="submit" value="Create Test"></input>
      </form>
    </>
  );
};

export default GenerateQuiz;
