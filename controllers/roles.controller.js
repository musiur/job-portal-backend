const RoleModel = require("../models/roles.model");
const JobModel = require("../models/jobs.model");
const { roleSchemaZod } = require("../schemas/roles.schema");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find();
    if (!roles.length) {
      return res.status(404).send({
        message: "No roles found!",
      });
    }
    res.status(200).send({ message: "Jobs found successfully.", roles });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.getSingleRole = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.params, _id);
    const role = await RoleModel.findById({ _id });
    if (!role) {
      return res.status(404).send({
        message: "No roles found!",
      });
    }
    res.status(200).send({ message: "Jobs found successfully.", role });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.createRole = async (req, res) => {
  try {
    const validatedPayload = roleSchemaZod.parse(req.body);
    const roles = await RoleModel.create(validatedPayload);
    // console.log(roles)
    if (!roles) {
      return res.status(500).send({
        message: "Couldn't create new role!",
      });
    }
    res.status(200).send({ message: "Role created successfully!", roles });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedRole = req.body;

    // Update the role document
    const role = await RoleModel.findByIdAndUpdate(_id, updatedRole, { new: true });

    // If the role is not found, return 404
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    // Update related jobs if necessary
    await JobModel.updateMany({ 'roles._id': _id }, { $set: { 'roles.$': updatedRole } });

    res.status(200).json({ message: "Role updated successfully.", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { _id } = req.params;

    // Delete the role document
    const role = await RoleModel.findByIdAndDelete(_id);

    // If the role is not found, return 404
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }

    // Update related jobs by removing the deleted role
    await JobModel.updateMany({}, { $pull: { roles: { _id: _id } } });

    res.status(200).json({ message: "Role deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};