const getOrderByStatus = require("../../Controllers/Order/getOrderByStatus");

const getOrderByStatusHandler = async (req, res, next) => {
  const { id_user } = req.user;
  const { status } = req.query;
  try {
    const order = await getOrderByStatus(id_user, status);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getOrderByStatusHandler;
