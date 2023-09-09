const { Router } = require("express");
const { checkoutHandler } = require("../../Handlers/MercadoPago/MercadoPago");
const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/checkout", checkoutHandler);

module.exports = mercadoPagoRouter;
