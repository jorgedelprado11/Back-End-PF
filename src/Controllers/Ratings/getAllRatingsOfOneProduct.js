// ! FUNCIONA. GENERA EL PROMEDIO DE TODOS LOS RATING DE UN PRODCTO Y ME ENTREGA LA INFO ASÍ

// {
// 	"ratings": [
// 		{
// 			"id_rating": 1,
// 			"value": 4,
// 			"id_producto": 120,
// 			"id_user": 2
// 		},
// 		{
// 			"id_rating": 2,
// 			"value": 5,
// 			"id_producto": 120,
// 			"id_user": 4
// 		},
// 		{
// 			"id_rating": 3,
// 			"value": 3,
// 			"id_producto": 120,
// 			"id_user": 7
// 		}
// 	],
// 	"averageValue": 4
// }




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


// ! OBTENER TODOS LOS RATINGS DE UN PRODUCTO


// const { Rating } = require("../../db");

// // Controlador para obtener todos los ratings de un producto particular
// const getAllRatingsOfOneProduct = async (req, res) => {
//   try {
//     const { id_producto } = req.params;

//     // Buscar todos los ratings para un producto particular
//     const ratings = await Rating.findAll({
//       where: { id_producto },
//     });

//     res.status(200).json(ratings);
//   } catch (error) {
//     console.error("Error al obtener los ratings del producto:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// module.exports = getAllRatingsOfOneProduct;




