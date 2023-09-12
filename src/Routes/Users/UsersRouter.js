const { Router } = require("express");
const deleteUser = require("../../Controllers/Users/deleteUser");
const usersRouter = Router();
const getAllUsers = require("../../Controllers/Users/getAllUsers");
const getUserById = require("../../Controllers/Users/getUserById");
const getUserByUsername = require("../../Controllers/Users/getUserByUsername");
const getUserByEmailAndPassword = require("../../Controllers/Users/getUserByEmailAndPassword");
const createUser = require("../../Controllers/Users/createUser");
const updateUser = require("../../Controllers/Users/updateUser");
const verifyToken = require("../../Assessments/verifyToken");
const verifyAdmin = require("../../Assessments/verifyAdmin");
const loginHandler = require("../../Handlers/User/loginHandler");
const getEliminatedUsers = require("../../Controllers/Users/getEliminatedUsers");
const restoreUser = require("../../Controllers/Users/restoreUser");

usersRouter.get("/eliminados", getEliminatedUsers);

usersRouter.post("/:id", restoreUser);

usersRouter.post("/login", loginHandler); // ? OK

usersRouter.get("/", verifyAdmin, getAllUsers); // ? OK

usersRouter.post("/createUser", createUser); // ? OK

usersRouter.get("/profile", getUserByUsername); // ? OK

usersRouter.get("/:id", getUserById); // ? OK

usersRouter.put("/:id", updateUser); // ? OK

usersRouter.delete("/:id", deleteUser); // ? OK

module.exports = usersRouter;
