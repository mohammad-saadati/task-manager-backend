const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "title must have 50 chars at most."],
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

TaskSchema.post("save", async function (doc, next) {
  const board = await Column.update(
    { _id: doc.columnId },
    { $push: { tasksOrder: doc._id } }
  );
  next();
});

module.exports = mongoose.model("Task", TaskSchema);
