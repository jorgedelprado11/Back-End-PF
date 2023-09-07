require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const { id_role } = decodedToken.dataValues;
    if (id_role !== 1) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    req.user = decodedToken.dataValues;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Error en el acceso" });
  }
};
module.exports = verifyAdmin;
