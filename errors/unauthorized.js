const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customAPI");

class Unauthorized extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
