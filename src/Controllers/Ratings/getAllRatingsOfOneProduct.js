const { Rating } = require("../../db");

// Controlador para obtener todos los ratings de un producto particular y calcular el promedio
const getAllRatingsOfOneProduct = async (req, res) => {
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

    res.status(200).json({ ratings, averageValue });
  } catch (error) {
    console.error("Error al obtener los ratings del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getAllRatingsOfOneProduct;


// ! RUTA

// * GET      http://localhost:3001/ratings/124/rating


// ! COMO LLEGA LA INFO

// {
// 	"ratings": [
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
// 		},
// 		{
// 			"id_rating": 7,
// 			"value": 5,
// 			"id_producto": 124,
// 			"id_user": 3
// 		}
// 	],
// 	"averageValue": 2.6666666666666665
// }


