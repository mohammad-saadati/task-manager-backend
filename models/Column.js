const mongoose = require("mongoose");
// models
const Board = require("./Board");
const Task = require("./Task");

const ColumnSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "title must have 50 chars at most."],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "boardId is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    },
    tasksOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ColumnSchema.post("save", async function (doc, next) {
  const board = await Board.Board.findOneAndUpdate(
    { _id: doc.boardId },
    { $push: { columnsOrder: doc._id } }
  );
  next();
});
ColumnSchema.post("findOneAndDelete", async function (doc, next) {
  const board = await Board.Board.findOneAndUpdate(
    { _id: doc.boardId },
    { $pull: { columnsOrder: doc._id } }
  );
});
ColumnSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "columnId",
});

module.exports.Column = mongoose.model("Column", ColumnSchema);
