const { Order } = require("../../db");

const deleteOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const orderToDelete = await Order.findByPk(id_order);

    if (!orderToDelete) {
      throw new Error("Pedido no encontrado");
    }

    await orderToDelete.destroy();

    return res.status(200).json({
      message: `El pedido con ID ${orderToDelete.id_order} fue eliminado exitosamente.`,
    });
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports = deleteOrder;
