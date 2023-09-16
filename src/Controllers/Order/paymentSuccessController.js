const { Order, Products } = require("../../db");
const createCartForUser = require("./createCartForUser");

const paymentSuccessController = async (id_user) => {
  const order = await Order.findOne({
    where: { id_user, status: "cart" },
    include: [
      { model: Products, attributes: ["id_producto", "nombre", "precio"] },
    ],
  });
  order.status = "in-process";
  await order.save();
  await createCartForUser(id_user);
  return order;
};
module.exports = paymentSuccessController;
