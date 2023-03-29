const express = require("express");
const router = express.Router();

const {
  addColumn,
  getColumns,
  deleteSingleColumn,
  updateSingleColumn,
  reorderColumn,
} = require("../controllers/columns.js");

router.route("/columns").get(getColumns).post(addColumn);
router.route("/columns/reorder").put(reorderColumn);
router.route("/columns/:id").put(updateSingleColumn).delete(deleteSingleColumn);

module.exports = router;
