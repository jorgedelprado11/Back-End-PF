const { Order } = require("../../db");
const createCartForUser = async (id) => {
  try {
    console.log("id", id);
    const newCart = await Order.create({ id_user: id, status: "cart" });
    return newCart;
  } catch (error) {
    console.log(error);
  }
};
module.exports = createCartForUser;
