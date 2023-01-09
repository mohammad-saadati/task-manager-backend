const CustomApiError = require("./customAPI");
const NotFoundError = require("./notFound");
const BadRequestError = require("./badRequest");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
};
