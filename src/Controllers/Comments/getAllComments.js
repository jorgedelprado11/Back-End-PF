const { Comments } = require("../../db");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.findAll();

    if (!comments) throw Error("Locations Not Found");

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllComments;
