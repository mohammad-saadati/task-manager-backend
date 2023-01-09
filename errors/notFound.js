const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomApi {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.NotFound
  }
}

module.export = NotFound