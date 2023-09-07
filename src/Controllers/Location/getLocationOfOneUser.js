const { Location, Users } = require("../../db");

const getLocationOfOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await Users.findByPk(id);

    if (!user) throw Error("User Not Found");

    const location = await Location.findOne({
      where: { id_location: id },
    });

    if (!location) throw Error("Location Not Found for this User");

    return res.status(200).json(location);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getLocationOfOneUser;
