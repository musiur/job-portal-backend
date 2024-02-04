const express = require("express");
const RootRouter = express.Router();
const UserRouter = require("./users.routes");
const RoleRouter = require("./roles.routes");
const JobRouter = require("./jobs.routes");

RootRouter.use("/users", UserRouter);
RootRouter.use("/roles", RoleRouter);
RootRouter.use("/jobs", JobRouter);

module.exports = RootRouter;
