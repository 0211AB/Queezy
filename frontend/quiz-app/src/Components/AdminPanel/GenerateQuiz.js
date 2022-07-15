import React, { useState, useEffect, useContext } from "react";
import {
  FaAddressCard,
  FaCircle,
  FaFacebook,
  FaGoogle,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import reg from "../../Images/register.svg";
import AuthContext from "../../Store/auth-context";
import "./AdminPanel.css";
import './GenerateQuiz.css'

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
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const pwdChangeHandler = (e) => {
    setPwd(e.target.value);
  };

  useEffect(() => {
    const sendData = async () => {
      console.log(data);
      const res = await fetch("http://localhost:8000/patient/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datares = await res.json();

      if (datares.code === 11000) {
        alert(`${JSON.stringify(datares.keyValue)} aldready exists!!`);
      }

      if (res.status === 201) {
        authCtx.login(datares.token);
        navigate(`/patient/${datares.id}`);
      }
    };

    if (data !== null) sendData();
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    setData({
      name: name,
      password: pwd,
      email: email,
    });
  };

  const [tests, setTests] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [topic, settopic] = useState("");
  const [amount, setamount] = useState("");
  const [time, settime] = useState("");
  const [expiry, setexpiry] = useState(new Date());
  return (
    <>
      <div className="big-title">
        <h2 className='centered'>Fill In the details to create a quiz !!</h2>
      </div>
      <form className="sign-in-form" onSubmit={submitHandler}>
      <div className="input-field">
      <i className="fas fa-lock"></i>
            <select
              onChange={(e) => settopic(e.target.value.toString())}
              required
            >
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
            onChange={nameChangeHandler}
            required
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="text"
            placeholder="Time Duration (Mins)"
            onChange={pwdChangeHandler}
            required
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="date"
            placeholder="Expiry"
            onChange={pwdChangeHandler}
            required
          />
        </div>
          <input class="btn create-test-btn" value="Create Test"></input>
      </form>
    </>
  );
};

export default GenerateQuiz;
