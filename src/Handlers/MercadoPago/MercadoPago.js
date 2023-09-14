const checkoutController = require("../../Controllers/MercadoPago/checkout");

const checkoutHandler = async (req, res, next) => {
  const id_user = req.user.id;
  try {
    const init_point = await checkoutController(id_user);
    if (!init_point) {
      return res.status(400).json({ message: "Error al crear el checkout" });
    }
    res.json({ init_point });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { checkoutHandler };
