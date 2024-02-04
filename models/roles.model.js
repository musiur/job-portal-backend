const mongoose = require("mongoose");
const { RoleSchema } = require("../schemas/roles.schema");

const RoleModel = new mongoose.model("roles", RoleSchema);

module.exports = RoleModel;
