const express = require("express");
const router = express.Router();
// controllers
const {
  addTask,
  getAllTasks,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
  reorderTask,
  moveTask,
} = require("../controllers/tasks");

router.route("/tasks").get(getAllTasks).post(addTask);
router.route("/tasks/reorder").put(reorderTask);
router.route("/tasks/move").put(moveTask);
router
  .route("/tasks/:id")
  .get(getSingleTask)
  .put(updateSingleTask)
  .delete(deleteSingleTask);

module.exports = router;
