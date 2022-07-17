const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Result = require("../models/result");
const Quiz = require("../models/quiz");

router.post("/result-score", async (req, res) => {
  try {
    console.log(req.body);
    const quiz = req.body.id;
    const name = req.body.name;
    const score = req.body.score;
    const questionsCorrect = req.body.questionsCorrect;
    const timePerAnswer = req.body.times;

    console.log(typeof questionsCorrect[0]);
    const result = {
      quiz,
      name,
      score,
      questionsCorrect,
      timePerAnswer,
    };

    var resultS = new Result(result);
    const savedRes = await resultS.save();

    console.log(savedRes);

    res.status(201).json({ savedRes });
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
});

router.post("/test-data", async (req, res) => {
  try {
    console.log(req.body);
    const quizId = req.body.id;
    const quiz = await Quiz.find({ uuid: quizId });
    console.log(quiz);
    if (quiz === null)
      return res.status(400).json({ Error: "No such quiz available" });

    const searchP = quiz._id;

    const results = await Result.find({ quiz: searchP });
    console.log(results);

    res.status(200).json({ results });
  } catch (e) {
    //console.log(e);
    res.status(404).json(e);
  }
});

module.exports = router;
