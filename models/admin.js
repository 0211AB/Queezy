const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("express-validator");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  picture: {
    type: String
  },
  id: {
    type:String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.generateAuthToken = async function () {
  try {
    if (this.tokens.length > 1) this.tokens.splice(0, 1);
    const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY);
    this.tokens.push({ token: token });
    return token;
  } catch (e) {
    return e;
  }
};

const Admin = new mongoose.model("admin", AdminSchema);

module.exports = Admin;
