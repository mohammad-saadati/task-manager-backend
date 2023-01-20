const { createCustomError } = require("../errors/customAPI");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    next(createCustomError("No Token Provided", 401));

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    next(createCustomError("Token is not valid", 400));
  }

  next();
};

module.exports = authentication;
