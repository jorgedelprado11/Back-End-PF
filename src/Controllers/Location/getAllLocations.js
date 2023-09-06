const { Location } = require("../../db");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();

    if (!locations || locations.length === 0) {
      return res.status(500).json({ message: "Locations Not Found" });
    }

    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json({ message: "Error simulado" });
  }
};

module.exports = getAllLocations;

// const getAllLocations = async (req, res) => {
//   // Simplemente respondemos con un estado HTTP 200
//   return res.status(200);
// };

// module.exports = getAllLocations;
