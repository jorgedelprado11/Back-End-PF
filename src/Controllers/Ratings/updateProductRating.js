const { Rating, Products } = require("../../db");

// Controlador para actualizar el valor de un Rating y la calificación de un Producto
const updateRatingValue = async (req, res) => {
  try {
    const { id_rating } = req.params;
    const { value } = req.body;

    // Buscar el Rating por su ID
    const rating = await Rating.findByPk(id_rating);

    if (!rating) {
      return res.status(404).json({ error: "Rating no encontrado" });
    }

    // Actualizar el valor del Rating
    rating.value = value;
    await rating.save();

    // Actualizar la calificación del Producto con el nuevo valor
    const product = await Products.findByPk(rating.id_producto);
    if (product) {
      product.calificacion = value;
      await product.save();
    }

    res.status(200).json({ rating, product });
  } catch (error) {
    console.error("Error al actualizar el valor del Rating:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = updateRatingValue;
