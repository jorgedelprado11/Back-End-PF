const { Rating } = require("../../db");

// Controlador para eliminar una calificación de un producto y usuario específicos
const deleteRating = async (req, res) => {
  try {
    const { id_user, id_producto } = req.params;

    if (!id_user || !id_producto) {
      res.status(400).json({ error: "Faltan campos requeridos" });
      return;
    }

    // Buscar la calificación que coincida con el usuario y el producto
    const ratingToDelete = await Rating.findOne({
      where: {
        id_user,
        id_producto,
      },
    });

    if (!ratingToDelete) {
      res.status(404).json({ error: "Calificación no encontrada" });
      return;
    }

    // Eliminar la calificación
    await ratingToDelete.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = deleteRating;
