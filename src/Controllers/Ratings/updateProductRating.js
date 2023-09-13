const { Rating, Products } = require("../../db");

// Controlador para obtener todos los ratings de un producto particular y calcular el promedio
const updateProductRating = async (req, res) => {
  try {
    const { id_producto } = req.params;

    // Buscar todos los ratings para un producto particular
    const ratings = await Rating.findAll({
      where: { id_producto },
    });

    // Calcular el promedio de los valores (values)
    let totalValue = 0;
    for (const rating of ratings) {
      totalValue += rating.value;
    }
    const averageValue = ratings.length > 0 ? totalValue / ratings.length : 0;

    // Actualizar la propiedad 'calificacion' del producto con el valor promedio
    await Products.update(
      { calificacion: averageValue },
      { where: { id_producto } }
    );

    res.status(200).json({ ratings, averageValue });
  } catch (error) {
    console.error("Error al obtener los ratings del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = updateProductRating;
