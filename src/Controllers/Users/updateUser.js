const { Users } = require("../../db");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, firstName, lastName, phoneNumber } =
      req.body;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = updateUser;
