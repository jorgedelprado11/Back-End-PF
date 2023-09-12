
const { Users, Role, Location, Order } = require("../../db");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await Users.findOne({
      where: { id },
      include: [
        { model: Role, attributes: ["description"] },
        {
          model: Location,
          attributes: ["provincia", "ciudad", "calle", "codigo_postal"],
        },

      ],
    });

    if (!user) {
      return res.status(404).json({ user });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUserById;
