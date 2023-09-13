const { Rating, Products } = require("../../db");

// Controlador para crear un nuevo rating
const createRating = async (req, res) => {
  try {
    // Captura los datos
    const { value } = req.body;
    const { id_user, id_producto } = req.params;

    if (!value || !id_user || !id_producto) {
      res.status(404).send("Faltan campos requeridos");
    }
    // Crea la nueva valoración
    const [newRating, created] = await Rating.findOrCreate({
      where: { id_user, id_producto },
      defaults: {
        value,
      },
    });

    if (!created) {
      newRating.value = value;
      await newRating.save();
    }

    const ratings = await Rating.findAll({
      where: { id_producto },
    });

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

    res.status(201).json({ ratings, newRating, promedio: averageValue });
  } catch (error) {
    console.error("Error al crear el rating:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = createRating;

// ! RUTA

//  POST => http://localhost:3001/ratings/3/120

// ! COMO ENVIO LA INFORMACIÓN POR BODY

// {
// 	"value": 5
// }

// ! COMO LLEGA LA INFORMACIÓN

// {
// 	"ratings": [
// 		{
// 			"id_rating": 1,
// 			"value": 4,
// 			"id_producto": 120,
// 			"id_user": 1
// 		},
// 		{
// 			"id_rating": 2,
// 			"value": 1,
// 			"id_producto": 120,
// 			"id_user": 2
// 		},
// 		{
// 			"id_rating": 3,
// 			"value": 5,
// 			"id_producto": 120,
// 			"id_user": 3
// 		}
// 	],
// 	"newRating": {
// 		"id_rating": 3,
// 		"value": 5,
// 		"id_user": 3,
// 		"id_producto": 120
// 	},
// 	"promedio": 3.3333333333333335
// }
