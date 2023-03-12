const express = require("express");
const router = express.Router();

const { addColumn, getColumns } = require("../controllers/columns.js");

router.route("/columns").get(getColumns).post(addColumn);

module.exports = router;
