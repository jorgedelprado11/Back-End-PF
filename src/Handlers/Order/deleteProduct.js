const deleteProductController = require("../../Controllers/Order/deleteProductController");

const deleteProduct = async (req, res) => {
  const { id_producto, id_user } = req.body;
  try {
    const orderUpdated = await deleteProductController(id_producto, id_user);
    res.status(200).json({
      message: "Product deleted successfully",
      orderUpdated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = deleteProduct;
