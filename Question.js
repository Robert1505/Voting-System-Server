const mongoose = require("mongoose");
const Answer = require("./Answer");

const QuestionSchema = mongoose.Schema({
    label: String,
    answers: [],
    timestamp: {
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model("Question", QuestionSchema);