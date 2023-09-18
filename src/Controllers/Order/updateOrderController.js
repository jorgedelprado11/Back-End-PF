const { Order, OrderProduct, Products, Images } = require("../../db");

const updateOrderController = async (id_producto, quantity, id_order) => {
  if (quantity <= 0) {
    throw new Error("La cantidad debe ser mayor a 0");
  }
  const product = await Products.findByPk(id_producto);
  const [orderProduct, created] = await OrderProduct.findOrCreate({
    where: { OrderIdOrder: id_order, ProductIdProducto: product.id_producto },
    defaults: {
      quantity: quantity,
      price: product.precio * quantity,
    },
  });
  if (!created) {
    const totalStock = orderProduct.quantity + product.stock;
    orderProduct.quantity = quantity;
    product.stock = totalStock - quantity;
    if (product.stock < 0) {
      throw new Error("No hay stock suficiente");
    }
    orderProduct.price = product.precio * quantity;
    await orderProduct.save();
    await product.save();
  } else if (created) {
    product.stock -= quantity;
    if (product.stock < 0) {
      await orderProduct.destroy();
      throw new Error("No hay stock suficiente");
    }
    await product.save();
  }

  const orderUpdated = await Order.findByPk(id_order, {
    attributes: ["id_order", "status", "price", "updatedAt"],
    include: [
      {
        model: Products,
        attributes: ["id_producto", "nombre", "precio", "stock"],
        include: [{ model: Images /*through: { attributes: ["url"] }*/ }],
      },
    ],
  });
  orderUpdated.price = orderUpdated.Products.reduce(
    (acc, product) => acc + product.OrderProduct.price,
    0
  );
  await orderUpdated.save();
  return orderUpdated;
};
module.exports = updateOrderController;
