const { Router } = require("express");
const ratingRouter = Router();
const getAllRatings = require("../../Controllers/Ratings/getAllRatings");
const createRating = require("../../Controllers/Ratings/createRating");
const getAllRatingsOfOneProduct = require("../../Controllers/Ratings/getAllRatingsOfOneProduct");
const getRatingsOfOneUser = require("../../Controllers/Ratings/getRatingsOfOneUser");
const updateProductRating = require("../../Controllers/Ratings/updateProductRating");
const getLowRatings = require("../../Controllers/Ratings/getLowRatings");
const deleteRating = require("../../Controllers/Ratings/deleteRating");

ratingRouter.get("/", getAllRatings);

ratingRouter.post("/:id_user/:id_producto", createRating);

ratingRouter.get("/:id_producto/rating", getAllRatingsOfOneProduct);

ratingRouter.get("/:id_user/user", getRatingsOfOneUser);

ratingRouter.get("/:id_producto/low", getLowRatings);

ratingRouter.delete("/:id_user/:id_producto/delete", deleteRating);

// ?
ratingRouter.put("/:id_rating/update", updateProductRating);

module.exports = ratingRouter;
