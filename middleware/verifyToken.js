const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.send("Access denied");
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (err) {
      return res.send("No valid token");
    }
    req.userId = decode._id;
    console.log(decode);
    next();
  });
}

module.exports = verifyToken;
