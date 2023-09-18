const { Order, OrderProduct, Products } = require("../../db");
const getCartForUser = require("./getCartForUser.js");

const deleteProductController = async (id_producto, id_user) => {
  const order = await Order.findOne({ where: { id_user, status: "cart" } });
  const id_order = order.id_order;
  const orderProduct = await OrderProduct.findOne({
    where: { OrderIdOrder: id_order, ProductIdProducto: id_producto },
  });

  const quantityInOrder = orderProduct.quantity;

  const product = await Products.findByPk(id_producto);
  product.stock += quantityInOrder;
  await product.save();

 await orderProduct.destroy();
 
  const userCart = await getCartForUser(id_user);
  return userCart;
};
module.exports = deleteProductController;
