const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const Admin = require("../models/admin");
const Quiz = require("../models/quiz");
const auth = require("../middleware/auth");
const axios = require("axios");

router.post("/admin/signup", async (req, res) => {
  try {
    var admin = new Admin(req.body);
    const token = await admin.generateAuthToken();
    const saved_Admin = await admin.save();

    res.status(201).json({ token, id: saved_Admin._id });
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    //console.log(req.body)
    const password = req.body.password;
    const email = req.body.email;

    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) res.status(400).json({ Error: "No Such User Found" });
    else {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      //console.log(isPasswordValid)

      if (isPasswordValid) {
        ///console.log(doctor.tokens)
        const token = await admin.generateAuthToken();
        const saved_Admin = await admin.save();
        //console.log(saved_Doctor)

        res.status(200).json({ token, Name: saved_Admin.name });
      } else {
        res.status(400).json({ Error: "Incorrect Credentials" });
      }
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/admin/:id", auth, async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await Admin.findOne({ id: adminId });
    if (!admin) res.status(404).json({ Error: "Invalid Credentials" });
    else {
      res.status(200).json({
        name: admin.name,
        id: admin.id,
        email: admin.email,
      });
    }
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post("/admin/generate-test", auth, async (req, res) => {
  try {
    const amount = req.body.amount;
    const topic = req.body.topic;
    const duration = req.body.expiry;
    const time = req.body.time;

    const fetchData = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amount,
        category: topic,
      },
    });

   //console.log(fetchData.data.results);

    const quizData = {
      creator: req.body.id,
      amount,
      topic,
      time,
      expiry:duration,
      questions: fetchData.data.results,
    };

    //console.log(quizData);

    const quiz = new Quiz(quizData);
    const saved_quiz=await quiz.save();
        
    res.status(201).json({"Task":"1"});
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get("/admin/get-tests/:id", auth, async (req, res) => {
  const id=req.params.id
  const data=await Quiz.find({creator:id})
  //console.log(data)
  res.status(201).json(data)
})

module.exports = router;
