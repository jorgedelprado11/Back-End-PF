/* 
! ESTE ARCHIVO DEFINE UN CONTROLADOR PARA BUSCAR PRODUCTOS POR SU NOMBRE */

const { Products, Specification, SpecificationValue, Images } = require("../../db");
const { Op } = require("sequelize");

const getProductByName = async (req, res) => {
  try {
    const { nombre } = req.query;

    const searchProduct = await Products.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.eq]: nombre } },
          { nombre: { [Op.iLike]: `%${nombre}%` } },
        ],
      },
      include: [{ model: SpecificationValue, attributes: ['value', 'id'], include: [{model: Specification, attributes: ['name', 'id_specification']}], through: {attributes: []}}, { model: Images, attributes: ['url']}] }
    );
    if (searchProduct) {
      console.log(searchProduct);
      res.status(200).json({ searchProduct });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error occurred while searching for product" });
  }
};

module.exports = getProductByName;
