const { Comments } = require("../../db");

const deleteComment = async (req, res) => {
  const { id_comment } = req.params;
  try {
    const commentToDelete = await Comments.findByPk(id_comment);

    if (!commentToDelete) {
      throw new Error("Comentario no encontrado");
    }

    await commentToDelete.destroy();

    return res.status(200).json({
      message: `El comentario con ID ${commentToDelete.id_comment} fue eliminado exitosamente.`,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = deleteComment;
