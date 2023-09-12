const { Comments } = require("../../db");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.findAll();

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "Comments Not Found" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error simulado" });
  }
};

module.exports = getAllComments;
