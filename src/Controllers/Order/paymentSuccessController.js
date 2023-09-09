const { Order, Products } = require("../../db");

const paymentSuccessController = async (id_user) => {
  const order = await Order.findOne({ where: { id_user, status: "cart" } });
  order.status = "in-process";
  await order.save();
  await Order.create({ id_user, status: "cart" });
  return order;
};
module.exports = paymentSuccessController;
