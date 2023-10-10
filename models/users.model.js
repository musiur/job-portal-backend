const mongoose = require("mongoose");
const UserSchema = require("../schemas/users.schema");
const UserModel = new mongoose.model("users",UserSchema);
module.exports = UserModel;
