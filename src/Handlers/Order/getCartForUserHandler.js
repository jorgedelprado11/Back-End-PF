const getCartForUser = require("../../Controllers/Order/getCartForUser");

const getCartForUserHandler = async (req, res) => {
  try {
    const id_user = req.user.id;
    const cart = await getCartForUser(id_user);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = getCartForUserHandler;
