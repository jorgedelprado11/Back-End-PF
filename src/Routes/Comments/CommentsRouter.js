const { Router } = require("express");
const commentsRouter = Router();
const getAllComments = require("../../Controllers/Comments/getAllComments");
const getCommentById = require("../../Controllers/Comments/getCommentById");
const getCommentsOfOneUser = require("../../Controllers/Comments/getCommentsOfOneUser");
const getCommentsOfOneProduct = require("../../Controllers/Comments/getCommentsOfOneProduct");
const createComment = require("../../Controllers/Comments/createComment");
const updateComment = require("../../Controllers/Comments/updateComment");
const deleteComment = require("../../Controllers/Comments/deleteComment");

commentsRouter.get("/", getAllComments);
commentsRouter.get("/:id_comment", getCommentById);
commentsRouter.get("/:id_user/user", getCommentsOfOneUser);
commentsRouter.get("/:id_producto/producto", getCommentsOfOneProduct);
commentsRouter.post("/:id_user/:id_producto", createComment);
commentsRouter.put("/:id_comment", updateComment);
commentsRouter.delete("/:id_comment", deleteComment);

module.exports = commentsRouter;
