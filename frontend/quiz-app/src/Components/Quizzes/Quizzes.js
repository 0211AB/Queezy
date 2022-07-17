import React, { useState, useEffect} from "react";
import Header from "../Home/Header";
import "./Quizzes.css";

import shape from "../../Images/shape.png";
import QuizBox from "./QuizBox";

const Quizzes = () => {
  const [data,setData]=useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/quizs/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

      const datares = await res.json();
      //console.log(datares);
      setData(datares);
    };

   fetchData();
  }, []);

  return (
    <div className="big-wrapper light">
      <img src={shape} alt="" className="shape" />
      <Header />
      <div className="container ">
        <div className="big-title quizzes-title">
          <h1 className='centered'>Some upcoming quizzes...</h1>
        </div>
      </div>
      <div className="box-container vertical-scroll">
        {data!==null?data.map((item,index)=><QuizBox key={index} data={item}/>):<h1>No Upcoming Quizzes</h1>}
      </div>
    </div>
  );
};

export default Quizzes;
