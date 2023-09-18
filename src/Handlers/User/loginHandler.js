const loginUser = require("../../Controllers/Users/loginUser");
const getOrderForUser = require("../../Controllers/Order/getOrderForUser");

const loginHandler = async (req, res) => {
  try {
    const userData = req.body;
    const { token, id_user } = await loginUser(userData);
    const order = await getOrderForUser(id_user);
    res.status(200).json({ token, order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = loginHandler;
