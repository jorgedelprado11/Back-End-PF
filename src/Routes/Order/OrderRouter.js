const { Router } = require("express");
const orderRouter = Router();
const getAllOrder = require("../../Controllers/Order/getAllOrder");
const getOrderById = require("../../Controllers/Order/getOrderById");
const createOrder = require("../../Controllers/Order/createOrder");
const updateOrder = require("../../Controllers/Order/updateOrder");
const deleteOrder = require("../../Controllers/Order/deleteOrder");
const verifyAdmin = require("../../Assessments/verifyAdmin");
const verifyToken = require("../../Assessments/verifyToken");

// ! AGREGAR verifyToken
orderRouter.get("/", getAllOrder);
// ! AGREGAR verifyToken
orderRouter.get("/:id_order", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.put("/:id_order", updateOrder);
orderRouter.delete("/:id_order", deleteOrder);

module.exports = orderRouter;
