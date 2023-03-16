const express = require("express");
const router = express.Router();

const {
  addColumn,
  getColumns,
  deleteSingleBoard,
} = require("../controllers/columns.js");

router.route("/columns").get(getColumns).post(addColumn);
router.route("/columns/:id").delete(deleteSingleBoard);

module.exports = router;
