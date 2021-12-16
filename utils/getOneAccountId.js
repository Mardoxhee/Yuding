const jwt = require("jsonwebtoken");

getOneAccountId = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.id;
};

exports.module = getOneAccountId;
