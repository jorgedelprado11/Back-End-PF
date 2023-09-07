const { Location } = require("../../db");

const updateLocation = async (req, res) => {
  try {
    const { id_location } = req.params;

    const { provincia, ciudad, calle, codigo_postal } = req.body;

    const location = await Location.findByPk(id_location);

    if (!location)
      return res.status(404).json({ message: "Location no encontrada" });

    if (provincia) {
      location.provincia = provincia;
    }

    if (ciudad) {
      location.ciudad = ciudad;
    }

    if (calle) {
      location.calle = calle;
    }

    if (codigo_postal) {
      location.codigo_postal = codigo_postal;
    }

    await location.save();

    return res
      .status(200)
      .json({ message: "Ubicación actualizada correctamente", location });
  } catch (error) {
    return res.status(400).json("Error simulado");
  }
};

module.exports = updateLocation;
