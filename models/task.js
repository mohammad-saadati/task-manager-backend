const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "title must have 50 chars at most."],
      required: [true, "title is required."],
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: [true, "columnId is required"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
