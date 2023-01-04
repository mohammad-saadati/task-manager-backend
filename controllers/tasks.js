const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");
const { Error } = require("mongoose");
const { createCustomError } = require("../utils/errors");

const addTask = asyncWrapper(async (req, res) => {
  // env works here
  // console.log(process.env.MONGO_URI);
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
  });

  res.status(201).json({ task });
  // res.status(500).json({ error });
});
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res
    .status(200)
    .json({ status: true, message: "", tasks, count: tasks.length });
});
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError("Not Found", 404));
    // return res.status(404).json({ msg: `there is no task with id: ${taskId}` });
  }

  res.status(200).json({ task });
});
const deleteSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndDelete({
    _id: taskId,
  });

  if (!task) {
    return res.status(404).json({ msg: `there is no task with id: ${taskId}` });
  }

  res.status(200).json({ task });
});
const updateSingleTask = asyncWrapper(async (req, res) => {
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
    return res.status(404).json({ msg: `there is no task with id: ${taskId}` });
  }

  res.status(200).json({ task });
});

module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
