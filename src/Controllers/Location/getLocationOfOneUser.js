const { Location, Users } = require("../../db");

const getLocationOfOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { id },
      attributes: [],
      include: [
        {
          model: Location,
          attributes: ["provincia", "ciudad", "calle", "codigo_postal"],
        },
      ],
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getLocationOfOneUser;
