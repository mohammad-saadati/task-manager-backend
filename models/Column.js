const mongoose = require("mongoose");
//
const Board = require("./Board");

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
  { timestamps: true }
);

ColumnSchema.post("save", async function (doc, next) {
  const board = await Board.update(
    { _id: doc.boardId },
    { $push: { columnsOrder: doc._id } }
  );
  next();
});

module.exports = mongoose.model("Column", ColumnSchema);
