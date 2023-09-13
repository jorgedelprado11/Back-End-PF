// ! Conclusiones

// * value de un producto tiene que poder recibir varios valores (json)
// * Obtener todos los values y tratar de hacer el promedio allí

// ! CREAR RATING LO MÁS SIMPLE POSIBLE
// ! DESPUÉS CREAR RUTA PARA OBTENER TODOS LOS VALUES DE UN MISMO PRODUCTO Y ALLI REALIZAR EL PROMEDIO

const { Rating, Users, Products } = require("../../db");

// Controlador para crear un nuevo rating
const createRating = async (req, res) => {
  try {
    // Captura los datos
    const { value } = req.body;
    const { id_user, id_producto } = req.params;

    // Buscar o crear User
    const [user, createdUser] = await Users.findOrCreate({
      where: { id: id_user },
    });

    // Buscar o crear Producto
    const [product, createdProduct] = await Products.findOrCreate({
      where: { id_producto },
    });

    // Crea la nueva valoración
    const rating = await Rating.create({
      id_user: user.id,
      id_producto: product.id_producto,
      value,
    });

    res.status(201).json(rating);
  } catch (error) {
    console.error("Error al crear el rating:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = createRating;

// ! Intento de guardar el promedio
// ! Funciona a la segunda, se pueden guardar dos valoraciones de un producto
// ! Pero se reemplaza el valor y no se realiza el promedio

// const { Rating, Products, Users } = require("../../db");

// // Controlador para crear un nuevo rating
// const createRating = async (req, res) => {
//   try {
//     // Captura los datos
//     const { value } = req.body;
//     const { id_user, id_producto } = req.params;

//     // Buscar o crear User
//     const [user, createdUser] = await Users.findOrCreate({
//       where: { id: id_user },
//     });
//     // Buscar o crear Producto
//     const [product, createdProduct] = await Products.findOrCreate({
//       where: { id_producto },
//     });

//     // Buscar todas las valoraciones del producto
//     const ratings = await Rating.findAll({
//       where: { id_producto: product.id_producto },
//     });

//     // Calcular el nuevo promedio con la nueva valoración
//     let totalValue = 0;
//     for (const rating of ratings) {
//       totalValue += rating.value;
//     }
//     totalValue += value;
//     const newAverage = totalValue / (ratings.length + 1); // +1 para incluir la nueva valoración

//     product.calificacion = newAverage;
//     await product.save();

//     // Crear la nueva valoración
//     const rating = await Rating.create({
//       id_user: user.id,
//       id_producto: product.id_producto,
//       value,
//     });

//     res.status(201).json(rating);
//   } catch (error) {
//     console.error("Error al crear o actualizar el rating:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// module.exports = createRating;

// ! Intento de guardar el promedio
// ! Funciona a la segunda, se pueden guardar dos valoraciones de un producto
// ! Pero se reemplaza el valor y no se realiza el promedio

// const { Rating, Products, Users } = require("../../db");

// // Controlador para crear un nuevo rating
// const createRating = async (req, res) => {
//   try {
//     // Captura los datos
//     const { value } = req.body;
//     const { id_user, id_producto } = req.params;

//     // Buscar o crear User
//     const [user, createdUser] = await Users.findOrCreate({
//       where: { id: id_user },
//     });
//     // Buscar o crear Producto
//     const [product, createdProduct] = await Products.findOrCreate({
//       where: { id_producto },
//     });

//     // Buscar todas las valoraciones del producto
//     const ratings = await Rating.findAll({
//       where: { id_producto: product.id_producto },
//     });

//     // Calcular el nuevo promedio con la nueva valoración
//     let totalValue = 0;
//     for (const rating of ratings) {
//       totalValue += rating.value;
//     }
//     totalValue += value;
//     const newAverage = totalValue / (ratings.length + 1); // +1 para incluir la nueva valoración

//     // Actualizar el promedio del producto
//     product.average_rating = newAverage;
//     await product.save();

//     // Crear la nueva valoración
//     const rating = await Rating.create({
//       id_user: user.id,
//       id_producto: product.id_producto,
//       value,
//     });

//     res.status(201).json(rating);
//   } catch (error) {
//     console.error("Error al crear o actualizar el rating:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// module.exports = createRating;

// ! Crear Rating, funciona pero no se realiza el promedio
// ! Sólo me permite hacerlo una vez a la segunda se rompe

// const { Rating, Products, Users } = require("../../db");

// // Controlador para crear un nuevo rating
// const createRating = async (req, res) => {
//   try {
//     // Captura los datos
//     const { value } = req.body;
//     const { id_user, id_producto } = req.params;

//     // Buscar o crear User
//     const [user, createdUser] = await Users.findOrCreate({
//       where: { id: id_user },
//     });
//     // Buscar o crear Producto
//     const [product, createdProduct] = await Products.findOrCreate({
//       where: { id_producto },
//     });

//     // Buscar o crear Rating
//     const [rating, createdRating] = await Rating.findOrCreate({
//       where: { id_user: user.id, id_producto: product.id_producto },
//       defaults: { value },
//     });

//     // Si el rating ya existe, actualiza su valor
//     if (!createdRating) {
//       rating.value = value;
//       await rating.save();
//     }

//     res.status(201).json(rating);
//   } catch (error) {
//     console.error("Error al crear o actualizar el rating:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// module.exports = createRating;
