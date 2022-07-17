const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Result = require("../models/result");
const Quiz = require("../models/quiz");

router.post("/result-score", async (req, res) => {
  try {
    //console.log(req.body);
    const quiz = req.body.id;
    const name = req.body.name;
    const score = req.body.score;
    const questionsCorrect = req.body.questionCorrect;
    const timePerAnswer = req.body.times;

    const result = {
      quiz,
      name,
      score,
      questionsCorrect,
      timePerAnswer,
    };

    var resultS =new Result(result)
    const savedRes=await resultS.save();

    res.status(201).json({savedRes});

  } catch (e) {
    console.log(e)
    res.status(404).json(e);
  }
});

module.exports = router;
