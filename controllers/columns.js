// models
const { Board } = require("../models/Board");
const { Column } = require("../models/Column");
// response status
const { StatusCodes } = require("http-status-codes");
// errors
const { NotFoundError } = require("../errors");

const addColumn = async (req, res) => {
  const column = new Column({
    title: req.body.title,
    createdBy: req.user._id,
    boardId: req.body.boardId,
  });
  await column.save();
  res
    .status(StatusCodes.CREATED)
    .json({ error: false, msg: "Column created", column });
};
const getColumns = async (req, res) => {
  const boards = await Board.find({ createdBy: req.user._id });

  res.status(StatusCodes.OK).json({ error: false, msg: "", boards });
};
const updateSingleColumn = async (req, res) => {
  const { id: columnId } = req.params;

  const column = await Column.findOneAndUpdate({ _id: columnId }, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ error: false, msg: "Column updated", column });
};
const deleteSingleColumn = async (req, res) => {
  const { id: columnId } = req.params;

  const column = await Column.findOneAndDelete({ _id: columnId });

  res.status(StatusCodes.OK).json({ error: false, msg: "", column });
};
const reorderColumn = async (req, res) => {
  let board = await Board.findOneAndUpdate(
    { _id: req.body.boardId },
    { $pull: { columnsOrder: req.body.columnId } }
  );
  board = await Board.findOneAndUpdate(
    { _id: req.body.boardId },
    {
      $push: {
        columnsOrder: {
          $each: [req.body.columnId],
          $position: req.body.targetIndex,
        },
      },
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ error: false, msg: "Board columns reordered" });
};

module.exports = {
  addColumn,
  getColumns,
  updateSingleColumn,
  deleteSingleColumn,
  reorderColumn,
};
