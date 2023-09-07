const { Comments } = require("../../db");

const getCommentById = async (req, res) => {
  try {
    const { id_comment } = req.params;
    // console.log(id_comment);

    if (!id_comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const comment = await Comments.findOne({ where: { id_comment } });

    // console.log(comment);

    if (!comment) {
      return res.status(404).json({ comment });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getCommentById;
