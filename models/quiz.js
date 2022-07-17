const mongoose = require("mongoose");
const {v4 : uuidv4} = require('uuid')

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    uuid:{
      type:String,
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
    ratings:[
      {
        rating:{
          type:Number
        }
      }
    ],
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

quizSchema.pre("save", async function (next) {

  if(!this.isModified('uuid'))
      return next();
      
  const userId = uuidv4()
  this.uuid = userId.toString().replace("-","").substring(0,8);
  console.log(this.uuid)
  next();
});


const Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
