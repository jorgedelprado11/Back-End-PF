const paymentSuccessController = require("../../Controllers/Order/paymentSuccessController");

const paymentSuccess = async (req, res) => {
  const id_user = req.user.id;
  try {
    const order = await paymentSuccessController(id_user);
    if (order) {
      res.status(200).json({
        message: "Order updated successfully",
        data: order,
      });
    } else {
      res.status(404).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = paymentSuccess;
