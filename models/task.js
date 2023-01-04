const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    trim: true,
    type: String,
    maxLength: [50, "title must have 50 chars at most."],
    required: [true, "title is required."],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
