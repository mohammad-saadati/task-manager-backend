const mongoose = require("mongoose");
//
const Column = require("./Column");

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
  await Column.findOneAndUpdate(
    { _id: doc.columnId },
    { $push: { tasksOrder: { $each: [doc._id], $position: 0 } } }
  );
  next();
});
TaskSchema.post("findOneAndDelete", async function (doc, next) {
  const task = await Column.findOneAndUpdate(
    { _id: doc.columnId },
    { $pull: { tasksOrder: doc._id } }
  );
  next();
});

module.exports = mongoose.model("Task", TaskSchema);
