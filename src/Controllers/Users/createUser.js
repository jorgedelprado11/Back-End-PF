const { Users, Order } = require("../../db");
const createCartForUser = require("../Order/createCartForUser");

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      id_role,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [newUser, created] = await Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
        id_role: id_role || 2,
      },
    });
    if (created) {
      const id_user = newUser.id;
      await createCartForUser(id_user);
    }

    if (!newUser) throw Error("Users Not Found");

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = createUser;
