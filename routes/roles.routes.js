const express = require("express");
const { getAllRoles, getSingleRole, createRole, updateRole, deleteRole } = require("../controllers/roles.controller");
const RoleRouter = express.Router();
RoleRouter.get("/", getAllRoles);
RoleRouter.get("/:_id", getSingleRole);
RoleRouter.post("/", createRole);
RoleRouter.patch("/:_id", updateRole);
RoleRouter.delete("/:_id", deleteRole);
module.exports = RoleRouter;
