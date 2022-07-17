const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const Quiz = require("../models/quiz");

router.get("/quizs/all", async (req, res) => {
  const data = await Quiz.find({}).sort({ expiry: -1 }).limit(6);
  //console.log(data)
  res.status(201).json(data);
});

router.get("/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findOne({ uuid: quizId });
    if (!quiz) res.status(404).json({ Error: "No Such Quiz Found" });
    else res.status(200).json(quiz);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
});

router.post("/quiz/rating/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    // console.log(req.body)
    // console.log(quizId)
    const quiz = await Quiz.findOne({ _id: quizId });
    quiz.ratings.push[req.body.rating];
    const saved_quiz = await quiz.save();

    res.status(200).json(quiz);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
});

module.exports = router;
