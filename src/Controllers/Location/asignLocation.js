const { Users } = require("../../db");
const asignLocationController = async (id_location, id_user) => {
  const user = await Users.findOne({
    where: { id: id_user },
  });
  await user.setLocation(id_location);
  return user;
};
module.exports = asignLocationController;
