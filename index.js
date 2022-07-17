const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const adminRoutes = require("./routes/admin");
const quizRoutes = require("./routes/quiz");
const resultRoutes = require("./routes/results");

const URI = `mongodb+srv://admin:${process.env.DB_PASS}@cluster01.5gpna.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(quizRoutes);
app.use(resultRoutes);

app.listen(port, () => {
  console.log("App is running on port ", port);
});
