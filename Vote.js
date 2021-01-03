const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
    counter: Number
})

module.exports = mongoose.model("Vote", VoteSchema);