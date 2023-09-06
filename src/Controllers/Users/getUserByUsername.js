const { Users } = require("../../db");

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    console.log(username);

    if (!username) {
      return res.status(400).json({ message: " Missing required fields" });
    }

    const user = await Users.findOne({ where: { username } });

    console.log(user);

    if (!user) {
      return res.status(404).json(user);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getUserByUsername;
