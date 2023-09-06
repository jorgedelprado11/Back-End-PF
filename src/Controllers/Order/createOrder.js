const { Order } = require("../../db");

const createOrder = async (req, res) => {
  try {
    const newOrderData = req.body;
    const newOrder = await Order.create(newOrderData);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = createOrder;

// const { Order, Users } = require("../../db");

// const createOrder = async (req, res) => {
//   try {
//     const { status,  price} = req.body;
//     const { id_user } = req.params;

//     if (!status || !id_user || !id_user) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const userId = parseInt(id_user);

//     console.log("Se convirtió userID a número");

//     const user = await Users.findByPk(userId);

//     console.log("Se encontró el id del user");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("Se encontró el User");

//     const newOrder = await Order.create({
//       status: orderDetails.status,
//       package: orderDetails.package,
//     });
//     console.log("Se creo la orden");

//     // Asocia el usuario a la orden
//     await user.setOrder(newOrder);

//     console.log("Se realizó la asociación User-Order");

//     return res.status(201).json(newOrder);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = createOrder;

// ! PRUEBA ASOCIAR AL USER, FALTA ASOCIARLO A LOS PRODUCTOS Y

// const { Order, Users } = require("../../db");

// const createOrder = async (req, res) => {
//   try {
//     const { orderDetails } = req.body;
//     const { id_user } = req.params;

//     if (!orderDetails || !id_user) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const userId = parseInt(id_user);

//     console.log("Se convirtió userID a número");

//     const user = await Users.findByPk(userId);

//     console.log("Se encontró el id del user");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("Se encontró el User");

//     const newOrder = await Order.create({
//       status: orderDetails.status,
//       package: orderDetails.package,
//     });
//     console.log("Se creo la orden");

//     // Asocia el usuario a la orden
//     await user.setOrder(newOrder);

//     console.log("Se realizó la asociación User-Order");

//     return res.status(201).json(newOrder);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = createOrder;
