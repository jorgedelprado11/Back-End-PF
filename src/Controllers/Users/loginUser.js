const jsw = require("jsonwebtoken");
const { Users } = require("../../db");

const loginUser = async (userData) => {
  const user = await Users.findOne({
    where: { email: userData.email },
    attributes: ["email", "id_role", "id"],
  });
  if (!user) throw new Error("Credenciales invalidas, intente nuevamente");
  const token = jsw.sign({ ...user }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });
  const id_user = user.dataValues.id;
  console.log("id_user", id_user);
  return { token, id_user };
};

module.exports = loginUser;
