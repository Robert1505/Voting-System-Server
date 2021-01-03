const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
    name: String,
    votes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Answer", AnswerSchema);