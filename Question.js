const mongoose = require("mongoose");
const Answer = require("./Answer");

const QuestionSchema = mongoose.Schema({
    label: String,
    answers: [],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Question", QuestionSchema);