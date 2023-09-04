const jsw = require("jsonwebtoken");
const { Users } = require("../../db");

const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await Users.findOne({
      where: userData,
      attributes: ["username", "password", "id_role"],
    });
    if (!user)
      res.status(403).json({ message: "Usuario o contraseña incorrectos" });
    const token = jsw.sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = loginUser;
