// models
const Column = require("../models/Column");
// response status
const { StatusCodes } = require("http-status-codes");
// errors
const { NotFoundError } = require("../errors");

const addColumn = async (req, res) => {
  const column = await Column.create({
    title: req.body.title,
    createdBy: req.user._id,
    boardId: req.body.boardId
  });
  res
    .status(StatusCodes.CREATED)
    .json({ error: false, msg: "Column created", column });
};
const getColumns = async (req, res) => {
  const boards = await Board.find({ createdBy: req.user._id });

  res.status(StatusCodes.OK).json({ error: false, msg: "", boards });
};
const getSingleBoard = async (req, res) => {
  const { id: boardId } = req.params;

  const board = await Board.find({ _id: boardId });
  // check whether middleware catch the error or not
  res.status(StatusCodes.OK).json({ error: false, msg: "", board: board[0] });
};
const updateSingleBoard = async (req, res) => {
  const { id: boardId } = req.params;

  const board = await Board.findOneAndUpdate({ _id: boardId }, req.body, {
    new: true,
  });
  // check whether middleware catch the error or not
  res
    .status(StatusCodes.OK)
    .json({ error: false, msg: "Board updated", board });
};
const deleteSingleBoard = async (req, res) => {
  const { id: columnId } = req.params;

  const board = await Column.findOneAndDelete({ _id: columnId });

  res.status(StatusCodes.OK).json({ error: false, msg: "", board });
};

module.exports = {
  addColumn,
  getColumns,
  getSingleBoard,
  updateSingleBoard,
  deleteSingleBoard,
};
