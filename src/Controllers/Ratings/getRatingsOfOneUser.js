// ! OBTENER RATIGNS DE UN USER INCLUYENDO PROMEDIO

const { Rating } = require("../../db");

// Controlador para obtener todos los ratings de un usuario particular y calcular el promedio
const getRatingsOfOneUser = async (req, res) => {
  try {
    const { id_user } = req.params;

    // Buscar todos los ratings para un usuario particular
    const ratings = await Rating.findAll({
      where: { id_user },
    });

    // Calcular el promedio de los valores (values)
    let totalValue = 0;
    for (const rating of ratings) {
      totalValue += rating.value;
    }
    const averageValue = ratings.length > 0 ? totalValue / ratings.length : 0;

    res.status(200).json({ ratings, averageValue });
  } catch (error) {
    console.error("Error al obtener los ratings del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getRatingsOfOneUser;

// ! OBTENER RATINGS DE UN USER SIMPLE

// const { Rating } = require("../../db");

// // Controlador para obtener todos los ratings de un usuario particular
// const getRatingsOfOneUser = async (req, res) => {
//   try {
//     const { id_user } = req.params;

//     // Buscar todos los ratings para un usuario particular
//     const ratings = await Rating.findAll({
//       where: { id_user },
//     });

//     res.status(200).json(ratings);
//   } catch (error) {
//     console.error("Error al obtener los ratings del usuario:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// module.exports = getRatingsOfOneUser;
