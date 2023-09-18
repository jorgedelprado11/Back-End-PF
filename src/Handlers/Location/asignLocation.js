const asignLocationController = require("../../Controllers/Location/asignLocation");
const createLocation = require("../../Controllers/Location/createLocation");
const { Users, Location } = require("../../db");

const asignLocation = async (req, res) => {
  try {
    const id_user = req.user.id;
    const locationData = req.body;
    const { id_location } = await createLocation(locationData);
    await asignLocationController(id_location, id_user);
    const user = await Users.findOne({
      where: { id: id_user },
      include: { model: Location },
    });
    return res.status(200).json({ message: "Location assigned", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = asignLocation;
