const updateOrderController = require("../../Controllers/Order/updateOrderController");

const updateOrder = async (req, res) => {
  try {
    const { id_producto, quantity, id_order } = req.body;
    const orderUpdated = await updateOrderController(
      id_producto,
      quantity,
      id_order
    );
    if (!orderUpdated) {
      res.status(404).json({ message: "Pedido no encontrado" });
    } else {
      return res.status(200).json(orderUpdated);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = updateOrder;
