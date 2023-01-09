const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customAPI");

class Unauthenticated extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
