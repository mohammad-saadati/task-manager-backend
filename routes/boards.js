const express = require("express");
const router = express.Router();

const {
  addBoard,
  getAllBoards,
  getSingleBoard,
  updateSingleBoard,
  deleteSingleBoard,
} = require("../controllers/boards");

router.route("/boards").get(getAllBoards).post(addBoard);
router
  .route("/boards/:id")
  .get(getSingleBoard)
  .delete(deleteSingleBoard);
  .put(updateSingleBoard)

module.exports = router;
