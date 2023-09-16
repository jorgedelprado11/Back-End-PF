const { Users } = require("../../db");
const asignLocationController = async (id_location, id_user) => {
  await Users.update({ id_location }, { where: { id: id_user } });
};
module.exports = asignLocationController;
