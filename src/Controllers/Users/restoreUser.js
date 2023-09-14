const { Users } = require("../../db");

const restoreUser = async (req, res) => {
  try {
    const {id} = req.params;

    console.log(id);

    const user = await Users.findByPk(id, { paranoid: false });

    if(!user) return res.status(404).json({error: 'No se encontro este usuario'});

    await user.restore();

    return res.status(200).json({message: 'Usuario restaurado correctamente'})

  } catch (error) {
    return res.status(500).json({ message: error});
  }
};

module.exports = restoreUser;