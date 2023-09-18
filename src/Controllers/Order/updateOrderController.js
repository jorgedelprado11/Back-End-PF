const { Order, OrderProduct, Products, Images } = require("../../db");

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
      await OrderProduct.destroy({
        where: {
          OrderIdOrder: id_order,
          ProductIdProducto: product.id_producto,
        },
      });
      return;
    } else if (!created) {
      orderProduct.quantity = quantity;
      orderProduct.price = product.precio * quantity;
      await orderProduct.save();
      console.log(orderProduct.dataValues);
    }

    const newStock = product.stock - quantity;
    product.stock = newStock;
    await product.save();
    
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
  } catch (error) {}
};
module.exports = updateOrderController;
