import { StatusCodes } from "http-status-codes";
const { CustomApiError } = require("../utils");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError)
    return res.status(err.statusCode).json({ msg: err.message });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = errorHandlerMiddleware;
