const { Rating } = require("../../db");
const { Op } = require("sequelize");

// Controlador para obtener todas las calificaciones menores a 3 para un producto específico
const getLowRatingsForProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;

    if (!id_producto) {
      res.status(404).send("Falta el campo requerido 'id_producto'");
      return;
    }

    const lowRatings = await Rating.findAll({
      where: {
        id_producto,
        value: {
          [Op.lt]: 3,
        },
      },
    });

    res.status(200).json({ lowRatings });
  } catch (error) {
    console.error("Error al obtener las calificaciones bajos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getLowRatingsForProduct;

// ! RUTA

// * GET    http://localhost:3001/ratings/124/low

// ! COMO LLEGA LA INFO

// {
// 	"lowRatings": [
// 		{
// 			"id_rating": 5,
// 			"value": 1,
// 			"id_producto": 124,
// 			"id_user": 1
// 		},
// 		{
// 			"id_rating": 6,
// 			"value": 2,
// 			"id_producto": 124,
// 			"id_user": 2
// 		}
// 	]
// }
