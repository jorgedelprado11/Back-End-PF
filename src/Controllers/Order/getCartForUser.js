const { Order, Products, Images } = require("../../db");

const getCartForUser = async (id_user) => {
  const order = await Order.findOne({
    where: { id_user, status: "cart" },
    attributes: ["id_order"],
    include: [
      {
        model: Products,
        attributes: ["id_producto", "nombre", "precio", "stock"],
        include: [{ model: Images /*through: { attributes: ["url"] }*/ }],
      },
    ],
  });
  return order;
};
module.exports = getCartForUser;
