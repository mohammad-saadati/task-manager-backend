const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customAPI");

class BadRequest extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
