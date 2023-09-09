const loginUser = require("../../Controllers/Users/loginUser");
const getOrderByStatus = require("../../Controllers/Order/getOrderByStatus");

const loginHandler = async (req, res) => {
  try {
    const userData = req.body;
    const { token, id_user } = await loginUser(userData);
    const order = await getOrderByStatus(id_user, "cart");
    res.status(200).json({ token, order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = loginHandler;
