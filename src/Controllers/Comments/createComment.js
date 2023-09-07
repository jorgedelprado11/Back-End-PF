const { Comments, Users, Products } = require("../../db");

const createComment = async (req, res) => {
  try {
    const { description } = req.body;
    const { id_user, id_producto } = req.params;

    if (!description || !id_user || !id_producto) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = parseInt(id_user);
    const productId = parseInt(id_producto);

    const user = await Users.findByPk(userId);
    const product = await Products.findByPk(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    const newComment = await Comments.create({
      description,
      id_user: userId,
      id_producto: productId,
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createComment;
