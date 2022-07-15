import React, { useState, useEffect, useContext } from "react";
import { FaAddressCard, FaArchive, FaCircle, FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../Images/logo.png";
import AuthContext from "../../Store/auth-context";
import "./AdminPanel.css";
import GenerateQuiz from "./GenerateQuiz";
import Tests from "./Tests";
import Analytics from "./Analytics";

import CreateQuiz from "./GenerateQuiz";

const AdminPanel = (props) => {
  console.log(props);
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
      <div id="mySidenav" class="sidenav">
        <p class="logo">Queezy</p>
        <Link to={`/admin/generate/${data.id}`} class="icon-a">
          <FaArchive /> &nbsp;&nbsp;Generate Test
        </Link>
        <Link to={`/admin/create/${data.id}`} class="icon-a">
          <FaAddressCard /> &nbsp;&nbsp;Create Test
        </Link>
        <Link to={`/admin/tests/${data.id}`} class="icon-a">
          <FaUser /> &nbsp;&nbsp;My Tests
        </Link>
        <Link to={`/admin/analytics/${data.id}`} class="icon-a">
          <FaCircle /> &nbsp;&nbsp;Analytics
        </Link>
      </div>
      <div id="main">
        <div class="head">
          <div class="col-div-6">
            <div class="profile">
              <img src={logo} class="pro-img" />
              <p>
                {data.name} <span>{data.email}</span>
              </p>
            </div>
          </div>
          <div class="clearfix"></div>
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
