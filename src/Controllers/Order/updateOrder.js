const { Order, OrderProduct, Products } = require("../../db");

const updateOrder = async (req, res) => {
  try {
    const { id_producto, quantity, id_order } = req.body;
    const product = await Products.findByPk(id_producto);
    const [newOrder, created] = await OrderProduct.findOrCreate({
      where: { OrderIdOrder: id_order, ProductIdProducto: product.id_producto },
      defaults: { quantity, price: product.price * quantity },
    });
    if (!created) {
      newOrder.quantity += quantity;
      newOrder.price += product.price * quantity;
      await newOrder.save();
    }

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = updateOrder;
