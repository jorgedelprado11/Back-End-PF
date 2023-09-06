const { Order, Products } = require("../../db");

const getOrderByStatus = async (id_user, status) => {
  const order = await Order.findOne({
    where: { id_user, status },
    attributes: ["id_order", "status", "price", "updatedAt"],
    include: [
      { model: Products, attributes: ["id_producto", "nombre", "precio"] },
    ],
  });
  return order;
};
module.exports = getOrderByStatus;
