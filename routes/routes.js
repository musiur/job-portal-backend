const express = require("express");
const RootRouter = express.Router();
const UserRouter = require("./users.routes")
RootRouter.use("/users", UserRouter);
module.exports = RootRouter;

