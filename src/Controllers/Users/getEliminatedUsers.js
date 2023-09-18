const { Users} = require("../../db");
const { Op } = require("sequelize");

const getEliminatedUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
        paranoid: false,
        where: {
            deletedAt: {
                [Op.not]: null
            }
        }
    })

    if (!users) return res.status(404).json({error: 'No se encontraron usuarios eliminados'});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getEliminatedUsers;