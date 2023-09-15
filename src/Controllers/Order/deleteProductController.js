const { Order, OrderProduct } = require("../../db");
const getCartForUser = require("./getCartForUser.js");

const deleteProductController = async (id_producto, id_user) => {
  const order = await Order.findOne({ where: { id_user, status: "cart" } });
  const id_order = order.id_order;
  const deleted = await OrderProduct.destroy({
    where: { OrderIdOrder: id_order, ProductIdProducto: id_producto },
  });
  console.log(deleted);
  const userCart = await getCartForUser(id_user);
  return userCart;
};
module.exports = deleteProductController;
