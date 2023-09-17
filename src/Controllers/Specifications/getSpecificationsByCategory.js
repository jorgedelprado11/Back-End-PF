const {
  specificationModel,
  Specification,
  Categories,
  SpecificationValue,
} = require("../../db");

const getSpecsByCategoryController = async (id) => {
  const specs = await Specification.findAll({
    include: [
      { model: Categories, where: { id_categoria: id }, attributes: [] },
      { model: SpecificationValue, attributes: ["value", "id"] },
    ],
  });
  return specs;
};

const getSpecByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const specs = await getSpecsByCategoryController(id);
    // const response = { message: "todo ok", specifications: specs };
    res.status(200).json(specs);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = getSpecByCategory;
