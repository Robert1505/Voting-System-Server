const express = require("express");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId; 
const app = express();
const Vote = require("./Vote");
const Question = require("./Question");
const cors = require("cors");
const Answer = require("./Answer");

const URI =
  "mongodb+srv://user:password12345@cluster0.r69cr.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(
  URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true },
  () => {
    console.log("Connected to the database!");

    app.listen(process.env.PORT, () => {
      console.log("Serverul a pornit!");
    });
  }
);

let initialState = 0;

// Middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(initialState);
});

app.post("/submitQuestion", async (req, res) => {
  console.log(req.body);
  const newQuestion = new Question({
    label: req.body.label,
  });

  const dummyData = req.body.answers;

  dummyData.forEach((data) => {
    const newAnswer = new Answer({ name: data.name });
    newQuestion.answers.push(newAnswer);
  });

  await newQuestion.save();

  res.json(newQuestion);
});

app.get("/allQuestions", async (req, res) => {
  const allQuestions = await Question.find();

  res.json(allQuestions);
});

app.get("/latest", async (req, res) => {
  const allQuestions = await Question.find().sort({ timestamp: -1 });

  res.json(allQuestions[0]);
});

app.post("/addVote", async (req, res) => {
  /// req.body.answerId
  await Question.findOneAndUpdate({ "answers._id": ObjectId(req.body.answerId) }, {
      $inc: {
          "answers.$.votes": 1
      }
  });

  res.json("Am actualizat intrebarea");

});
