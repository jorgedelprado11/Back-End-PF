const { Comments } = require("../../db");

const updateComment = async (req, res) => {
  try {
    const { id_comment } = req.params;
    const { description } = req.body;

    const existingComment = await Comments.findByPk(id_comment);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment) {
      existingComment.description = description;
    }

    await existingComment.save();

    return res.status(200).json(existingComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateComment;
