const { Comments, Products } = require("../../db");

const getCommentsOfOneProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const product = await Products.findByPk(id_producto);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comments = await Comments.findAll({
      where: { id_producto },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getCommentsOfOneProduct;
