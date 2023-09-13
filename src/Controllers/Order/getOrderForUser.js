const { Order, Products } = require("../../db");

const getOrderForUser = async (id_user) => {
  const order = await Order.findAll({
    where: { id_user },
    attributes: ["id_order", "status", "price", "updatedAt"],
    include: [
      { model: Products, attributes: ["id_producto", "nombre", "precio"] },
    ],
  });
  return order;
};
module.exports = getOrderForUser;
