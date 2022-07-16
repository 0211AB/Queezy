const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    questions: [
      {
        category: {
          type: String,
        },
        type: {
          type: String,
        },
        difficulty: {
          type: String,
        },
        question: {
          type: String,
          required: true,
        },
        correct_answer: {
          type: String,
          required: true,
        },
        incorrect_answers: [
          {
            type: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
