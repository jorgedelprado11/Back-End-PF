const { Location } = require("../../db");
const { Op } = require("sequelize");

const getLocationByProvincia = async (req, res) => {
  try {
    const { provincia } = req.query;

    const searchLocation = await Location.findAll({
      where: {
        [Op.or]: [
          { provincia: { [Op.eq]: provincia } },
          { provincia: { [Op.iLike]: `%${provincia}%` } },
        ],
      },
    });
    if (searchLocation) {
      res.status(200).json(searchLocation);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error occurred while searching for Location" });
  }
};

module.exports = getLocationByProvincia;
