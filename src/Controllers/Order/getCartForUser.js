const { Order, Products } = require("../../db");

const getCartForUser = async (id_user) => {
  const order = await Order.findOne({
    where: { id_user, status: "cart" },
    attributes: ["id_order"],
  });
  return order;
};
module.exports = getCartForUser;
