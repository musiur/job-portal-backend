const express = require("express");
const { getUser } = require("../controllers/users.controller");
const { register, login } = require("../controllers/auth.controller");
const UserRouter = express.Router();
UserRouter.get("/user", getUser);
UserRouter.post("/register", register);
UserRouter.post("/login", login);
module.exports = UserRouter;
