const { Order, OrderProduct, Products } = require("../../db");

const updateOrderController = async (id_producto, quantity, id_order) => {
  try {
    const product = await Products.findByPk(id_producto);
    const [orderProduct, created] = await OrderProduct.findOrCreate({
      where: { OrderIdOrder: id_order, ProductIdProducto: product.id_producto },
      defaults: {
        quantity: quantity,
        price: product.precio * quantity,
      },
    });
    if (!orderProduct) {
      return;
    } else if (quantity === 0) {
      await orderProduct.destroy();
      return;
    } else if (!created) {
      console.log("no created");
      orderProduct.quantity = quantity;
      orderProduct.price = product.precio * quantity;
      await orderProduct.save();
      console.log(orderProduct.dataValues);
    }
    const orderUpdated = await Order.findByPk(id_order, {
      attributes: ["id_order", "status", "price", "updatedAt"],
      include: [
        { model: Products, attributes: ["id_producto", "nombre", "precio"] },
      ],
    });
    console.log("orderUpdated", orderUpdated);
    return orderUpdated;
  } catch (error) {}
};
module.exports = updateOrderController;
