const { Router } = require("express");
const ratingRouter = Router();
const getAllRatings = require("../../Controllers/Ratings/getAllRatings");
const createRating = require("../../Controllers/Ratings/createRating");
const getAllRatingsOfOneProduct = require("../../Controllers/Ratings/getAllRatingsOfOneProduct");
const getRatingsOfOneUser = require("../../Controllers/Ratings/getRatingsOfOneUser");

ratingRouter.get("/", getAllRatings);

ratingRouter.post("/:id_user/:id_producto", createRating);

ratingRouter.get("/:id_producto/rating", getAllRatingsOfOneProduct);

ratingRouter.get("/:id_user/user", getRatingsOfOneUser);

module.exports = ratingRouter;
