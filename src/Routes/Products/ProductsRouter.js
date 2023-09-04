const { Router } = require("express");
const deleteProducts = require("../../Controllers/Products/deleteProducts");
const productsRouter = Router();
const getAllProducts = require("../../Controllers/Products/getAllProducts");
const getEliminatedProducts = require("../../Controllers/Products/getEliminatedProducts");
const getProductById = require("../../Controllers/Products/getProductById");
const getProductByName = require("../../Controllers/Products/getProductByName");
const getProductsByCalificacion = require("../../Controllers/Products/getProductsByCalificacion");
const postProducts = require("../../Controllers/Products/postProducts");
const restoreProducts = require("../../Controllers/Products/restoreProducts");
const updateProducts = require("../../Controllers/Products/updateProducts");
const verifyAdmin = require("../../Assessments/verifyAdmin");

productsRouter.get("/", (req, res) => {
  const { nombre } = req.query;
  !nombre ? getAllProducts(req, res) : getProductByName(req, res);
});

productsRouter.get("/eliminados", verifyAdmin, getEliminatedProducts);

productsRouter.get("/calificacion", getProductsByCalificacion);

productsRouter.get("/:id_producto", getProductById);

productsRouter.post("/", verifyAdmin, postProducts);

productsRouter.put("/:id_producto", verifyAdmin, updateProducts);

productsRouter.delete("/:id_producto", verifyAdmin, deleteProducts);

productsRouter.post("/:id_producto", verifyAdmin, restoreProducts);

module.exports = productsRouter;
