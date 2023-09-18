const { or } = require("sequelize");
const updateOrderStatusController = require("../../Controllers/Order/updateOrderStatusController");

const updateOrderStatus = async (req, res) => {
  try {
    const { id_order, status } = req.body;
    const orderUpdated = await updateOrderStatusController(id_order, status);
    if (!orderUpdated) {
      res.status(404).json({ message: "Pedido no encontrado" });
    } else {
      return res.status(200).json(orderUpdated);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = updateOrderStatus;
