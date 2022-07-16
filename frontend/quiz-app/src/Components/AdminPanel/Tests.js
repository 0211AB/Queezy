import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import TestAccordian from "./TestAccordian";
import "./Tests.css";

const Tests = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:8000/admin/get-tests/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        });

      const datares = await res.json();
      // console.log(datares);
      setData(datares);
    };

   fetchData();
  }, []);
  
  console.log(data.length)
  return (
    <div className="accordion">
      {data.length === 0 ? <h1>No Quizzes to show!!!!</h1> : data.map(item => <TestAccordian data={item}/>)}
    </div>
  );
};

export default Tests;
