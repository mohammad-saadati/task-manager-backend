import { StatusCodes } from "http-status-codes";
const CustomApiError = require("./error");

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
