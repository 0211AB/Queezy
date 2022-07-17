const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  questionsCorrect: [
    {
      type: String,
    },
  ],
  timePerAnswer: {
    type: Object,
  },
});

const Result = mongoose.model("result", resultSchema);

module.exports = Result;
