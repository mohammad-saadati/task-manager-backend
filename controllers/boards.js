// models
const Board = require("../models/Board");
// response status
const { StatusCodes } = require("http-status-codes");
// errors
const { NotFoundError } = require("../errors");

const addBoard = async (req, res) => {
  const board = await Board.create({
    title: req.title,
    createdBy: req.user._id,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ error: false, msg: "Board created", board });
};
const getAllBoards = async (req, res) => {
  const boards = await Board.find({});

  res.status(StatusCodes.OK).json({ error: false, msg: "", boards });
};
const getSingleBoard = async (req, res) => {
  const { id: boardId } = req.params;

  const board = await Board.find({ _id: boardId });
  // check whether middleware catch the error or not
  res.status(Status.OK).json({ error: false, msg: "", board });
};
const updateSingleBoard = async (req, res) => {
  const { id: boardId } = req.params;

  const board = await Board.findOneAndUpdate({ _id: boardId }, req.body, {
    new: true,
  });
  // check whether middleware catch the error or not
  res.status(StatusCodes.OK).json({ err: false, msg: "Board updated", board });
};
const deleteSingleBoard = async (req, res) => {
  const { id: boardId } = req.params;
  
  const board = Board.findOneAndDelete({ _id: boardId });
};

module.exports = {
  addBoard,
  getAllBoards,
  getSingleBoard,
  updateSingleBoard,
  deleteSingleBoard,
};
