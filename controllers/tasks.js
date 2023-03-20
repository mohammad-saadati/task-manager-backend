const Task = require("../models/Task");
// response status
const { StatusCodes } = require("http-status-codes");
// errors
const { Error } = require("mongoose");
const { createCustomError } = require("../errors/customAPI");

const addTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    columnId: req.body.columnId,
    createdBy: req.user._id,
    description: req.body.description,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ error: false, msg: "Task created", task });
};
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});

  res
    .status(StatusCodes.OK)
    .json({ error: false, message: "", tasks, count: tasks.length });
};
const getSingleTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError("Not Found", 404));
    // return res.status(404).json({ msg: `there is no task with id: ${taskId}` });
  }

  res.status(StatusCodes.OK).json({ error: false, msg: "", task });
};
const deleteSingleTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndDelete({
    _id: taskId,
  });

  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, msg: `there is no task with id: ${taskId}` });
  }

  res.status(StatusCodes.OK).json({ error: false, msg: "Task removed", task });
};
const updateSingleTask = async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: true, msg: `there is no task with id: ${taskId}` });
  }

  res.status(StatusCodes.OK).json({ task });
};

module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
