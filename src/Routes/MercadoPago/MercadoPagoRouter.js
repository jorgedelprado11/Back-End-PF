const { Router } = require("express");
const { checkoutHandler } = require("../../Handlers/MercadoPago/MercadoPago");
const verifyToken = require("../../Assessments/verifyToken");
const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/checkout", verifyToken, checkoutHandler);

module.exports = mercadoPagoRouter;
