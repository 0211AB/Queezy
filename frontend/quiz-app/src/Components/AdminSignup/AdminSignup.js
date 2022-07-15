import React, { useState, useEffect, useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "./AdminSignup.css";
import { Link, useNavigate } from "react-router-dom";
import reg from "../../Images/register.svg";
import AuthContext from "../../Store/auth-context";

const AdminSignup = () => {
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
      const res = await fetch("http://localhost:8000/admin/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const datares = await res.json();
      console.log(datares);

      if (datares.code === 11000) {
        alert(`${JSON.stringify(datares.keyValue)} aldready exists!!`);
      }

      if (res.status === 201) {
        authCtx.login(datares.token);
        navigate(`/admin/${datares.id}`);
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

  return (
    <>
      <div class="containerf">
        <div class="forms-container">
          <div class="signin-signup">
            <form class="sign-up-form" onSubmit={submitHandler}>
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" required onChange={nameChangeHandler}/>
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" required onChange={emailChangeHandler}/>
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" required minLength={8} onChange={pwdChangeHandler}/>
              </div>
              <input type="submit" class="btn" value="Sign up" />
              <p class="social-text">Or Sign up with social platforms</p>
              <div class="social-media">
                <Link to="#" class="social-icon">
                  <FaFacebook className="fab" />
                </Link>
                <Link to="#" class="social-icon">
                  <FaGoogle className="fab"></FaGoogle>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Aldready Registered?</h3>
              <p>
                Sign in to your account!!
              </p>
              <Link to='/admin/login'class="btn" id="sign-up-btn">
                Sign In
              </Link>
            </div>
            <img src={reg} class="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
