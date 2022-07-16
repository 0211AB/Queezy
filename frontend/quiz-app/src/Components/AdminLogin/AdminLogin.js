import React, { useState, useEffect, useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import log from "../../Images/log.svg";
import AuthContext from "../../Store/auth-context";

const AdminSignup = () => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const pwdChangeHandler = (e) => {
    setPwd(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setData({
      email:email,
      password: pwd,
    });
  };

  useEffect(() => {
    const sendData = async () => {
      const res = await fetch("http://localhost:8000/admin/login", {
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

      if (res.status === 400) {
        alert(`${JSON.stringify(datares.Error)}`);
      }

      if (res.status === 201) {
        authCtx.login(datares.token);
        navigate(`/admin/${datares._id}`);
      }
    };

    if (data !== null) sendData();
  }, [data]);

  return (
    <>
      <div className="containerf">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={submitHandler}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" required onChange={emailChangeHandler}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" minLength={8} required onChange={pwdChangeHandler}/>
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <Link to="#" className="social-icon">
                  <FaFacebook classNameName="fab" />
                </Link>
                <Link to="#" className="social-icon">
                  <FaGoogle classNameName="fab"></FaGoogle>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Start an exciting journey with us on Quuezy!
              </p>
              <Link to='/admin/signup'className="btn" id="sign-up-btn">
                Sign up
              </Link>
            </div>
            <img src={log} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
