const mongoose = require("mongoose");
// models
const { Column } = require("./Column");
const { Task } = require("./Task");

const BoardSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "Title must have 50 chars at most."],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    columnsOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
BoardSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc.columnsOrder.length) {
    await Column.deleteMany({ _id: { $in: doc.columnsOrder } });
    await Task.deleteMany({ columnId: { $in: doc.columnsOrder } });
  }
  next();
});
BoardSchema.virtual("columns", {
  ref: "Column",
  localField: "_id",
  foreignField: "boardId",
});

module.exports.Board = mongoose.model("Board", BoardSchema);
