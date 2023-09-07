require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = decodedToken.dataValues;
    next();
  } catch (error) {
    res.status(403).json({ message: "Acceso denegado" });
  }
};

module.exports = verifyToken;
