const { Order, Products } = require("../../db.js");
const updateOrderStatusController = async (id_order, status) => {
  try {
    const orderUpdated = await Order.update(
      { status },
      {
        where: { id_order },
        include: [
          { model: Products, attributes: ["id_producto", "nombre", "precio"] },
        ],
      }
    );
    const order = await Order.findOne({
      where: { id_order },
      include: [
        { model: Products, attributes: ["id_producto", "nombre", "precio"] },
      ],
    });
    return order;
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = updateOrderStatusController;
