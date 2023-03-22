const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: {
      trim: true,
      type: String,
      maxLength: [50, "title must have 50 chars at most."],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
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
  if (doc.columnsOrder.length)
    await Column.deleteMany({ _id: { $in: doc.columnsOrder } });
  next();
});
BoardSchema.virtual("columns", {
  ref: "Column",
  localField: "_id",
  foreignField: "boardId",
});

module.exports = mongoose.model("Board", BoardSchema);
