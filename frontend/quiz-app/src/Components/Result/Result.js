import React from "react";
import "./Result.css";
import rating from "../../Images/rating.svg";

import { useLocation, useNavigate } from "react-router-dom";

const Result = (props) => {
  const { state } = useLocation();
  const res = state.savedRes;
  const keys = Object.values(res.timePerAnswer);
  var totalTime = 0;
  for (var i = 0; i < keys.length; i++) totalTime += parseInt(keys[i]);
  totalTime = totalTime / 100;
  var mins = totalTime / 60;
  var secs = totalTime % 60;

  var cQs = res.questionsCorrect;

  return (
    <div class="popup-containerx">

    <div class="popupx">

        <h3>How satisfying was the quiz experience?<br></br>View your performance in the leaderboard</h3>

        <input type="radio" name="buttons" id="btn1"/>
        <input type="radio" name="buttons" id="btn2"/>
        <input type="radio" name="buttons" id="btn3"/>
        <input type="radio" name="buttons" id="btn4"/>
        <input type="radio" name="buttons" id="btn5"/>

        <div class="iconsx">
            <label for="btn1">🙁</label>
            <label for="btn2">😐</label>
            <label for="btn3">😊</label>
            <label for="btn4">😀</label>
            <label for="btn5">😍</label>
        </div>

        <input type="submit" value="submit" class="btn"/>

        <div onclick="toggle()" id="closex">✖</div>

    </div>

</div>
  );
};

export default Result;
