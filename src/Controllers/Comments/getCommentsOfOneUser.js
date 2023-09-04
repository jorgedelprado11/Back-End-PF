const { Comments, Users } = require("../../db");

const getCommentsOfOneUser = async (req, res) => {
  try {
    const { id_user } = req.params;

    const user = await Users.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comments = await Comments.findAll({
      where: { id_user },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getCommentsOfOneUser;