const { Task } = require("../models/Task");
const { Column } = require("../models/Column");
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `There is no task with id: ${taskId}` });
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, msg: `there is no task with id: ${taskId}` });
  }

  res.status(StatusCodes.OK).json({ error: false, msg: "Task updated", task });
};
const reorderTask = async (req, res) => {
  const { columnId, targetIndex, sourceIndex } = req.body;

  const tempCol = await Column.findOne({ _id: columnId });
  const tempTasksOrder = tempCol.tasksOrder;

  const temp = tempTasksOrder.splice(sourceIndex, 1)[0];
  tempTasksOrder.splice(targetIndex, 0, temp);

  const column = await Column.findOneAndUpdate(
    { _id: columnId },
    { tasksOrder: tempTasksOrder }
  );

  res.status(StatusCodes.OK).json({ error: false, msg: "Task reordered" });
};
const moveTask = async (req, res) => {
  const { source, destination, draggableId } = req.body;

  const srcCol = await Column.findOne({ _id: source.droppableId });

  const removedTaskId = srcCol.tasksOrder.splice(source.index, 1)[0];

  await Column.findOneAndUpdate(
    { _id: source.droppableId },
    { tasksOrder: srcCol.tasksOrder }
  );

  const desCol = await Column.findOne({ _id: destination.droppableId });

  desCol.tasksOrder.splice(destination.index, 0, removedTaskId);

  await Column.findOneAndUpdate(
    { _id: destination.droppableId },
    { tasksOrder: desCol.tasksOrder }
  );

  await Task.findOneAndUpdate(
    { _id: draggableId },
    { columnId: destination.droppableId }
  );

  res.status(StatusCodes.OK).json({ error: false, msg: "Task moved" });
};

module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
  reorderTask,
  moveTask,
};
