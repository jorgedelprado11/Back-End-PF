const { Order, OrderProduct, Products } = require("../../db");

const deleteOrder = async (req, res) => {
  const { id_order } = req.params;

  try {
    const orderToDelete = await Order.findByPk(id_order, {
      include: [
        {
          model: Products,
          through: {
            model: OrderProduct,
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (!orderToDelete) {
      throw new Error("Pedido no encontrado");
    }

    for (const product of orderToDelete.Products) {
      const quantityInOrder = product.OrderProduct.quantity;
      product.stock += quantityInOrder;
      await product.save();
    }

    await orderToDelete.destroy();

    return res.status(200).json({
      message: `El pedido con ID ${orderToDelete.id_order} fue eliminado exitosamente.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
};

module.exports = deleteOrder;
