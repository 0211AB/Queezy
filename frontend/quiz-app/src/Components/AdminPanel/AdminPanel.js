import React, { useState, useEffect, useContext } from "react";
import { FaAddressCard, FaArchive, FaCircle, FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../Images/logo.png";
import AuthContext from "../../Store/auth-context";
import "./AdminPanel.css";
import GenerateQuiz from "./GenerateQuiz";
import Tests from "./Tests";
import Analytics from "./Analytics";

import CreateQuiz from "./CreateQuiz";

const AdminPanel = (props) => {
  //console.log(props);
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/admin/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      const admin = await res.json();
      setData({
        name: admin.name,
        email: admin.email,
        id: admin.id,
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <div id="mySidenav" className="sidenav">
        <p className="logo">Queezy</p>
        <Link to={`/admin/generate/${data.id}`} className="icon-a">
          <FaArchive /> &nbsp;&nbsp;Generate Test
        </Link>
        <Link to={`/admin/create/${data.id}`} className="icon-a">
          <FaAddressCard /> &nbsp;&nbsp;Create Test
        </Link>
        <Link to={`/admin/tests/${data.id}`} className="icon-a">
          <FaUser /> &nbsp;&nbsp;My Tests
        </Link>
        <Link to={`/admin/analytics/${data.id}`} className="icon-a">
          <FaCircle /> &nbsp;&nbsp;Analytics
        </Link>
      </div>
      <div id="main">
        <div className="head">
          <div className="col-div-6">
            <div className="profile">
              <img src={logo} className="pro-img" />
              <p>
                {data.name} <span>{data.email}</span>
              </p>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        {props.val == 1 ? <GenerateQuiz /> : <></>}
        {props.val == 2 ? <CreateQuiz /> : <></>}
        {props.val == 3 ? <Tests /> : <></>}
        {props.val == 4 ? <Analytics /> : <></>}
      </div>
    </>
  );
};

export default AdminPanel;
