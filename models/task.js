const mongoose = require("mongoose");
// models
const Column = require("./Column");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "Title must have 50 chars at most."],
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: [true, "ColumnId is required"],
    },
    description: {
      type: String,
    },
    comment: {
      type: String,
    }
  },
  { timestamps: true }
);

TaskSchema.post("save", async function (doc, next) {
  await Column.Column.findOneAndUpdate(
    { _id: doc.columnId },
    { $push: { tasksOrder: { $each: [doc._id], $position: 0 } } }
  );
  next();
});
TaskSchema.post("findOneAndDelete", async function (doc, next) {
  const task = await Column.Column.findOneAndUpdate(
    { _id: doc.columnId },
    { $pull: { tasksOrder: doc._id } }
  );
  next();
});

module.exports.Task = mongoose.model("Task", TaskSchema);
