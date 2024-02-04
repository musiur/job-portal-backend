const JobModel = require("../models/jobs.model");
const RoleModel = require("../models/roles.model");
const { jobSchemaZod } = require("../schemas/jobs.schema");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    if (!jobs.length) {
      return res.status(404).send({
        message: "No jobs found!",
      });
    }
    res.status(200).send({ message: "Jobs found successfully.", jobs });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.getSingleJob = async (req, res) => {
  try {
    const { _id } = req.params;
    const jobs = await JobModel.find({ _id });
    if (!jobs) {
      return res.status(404).send({
        message: "No jobs found!",
      });
    }
    res.status(200).send({ message: "Jobs found successfully.", jobs });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const validatedPayload = jobSchemaZod.parse(req.body);
    const jobs = await JobModel.create(validatedPayload);
    if (!jobs) {
      return res.status(500).send({
        message: "Internal server error!",
      });
    }
    res.status(200).send({ message: "Job created successfully!", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { _id } = req.params;
    const exist = await JobModel.find({ _id });
    if (!exist) {
      return res.status(404).send({
        message: "No jobs found!",
      });
    }
    const validatedPayload = jobSchemaZod.parse(req.body);
    const jobs = await JobModel.updateOne({ _id }, validatedPayload);
    if (!jobs) {
      return res.status(500).send({
        message: "Internal server error!",
      });
    }
    res.status(200).send({ message: "Job updated successfully.", jobs });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { _id } = req.params;
    const exist = await JobModel.find({ _id });
    if (!exist) {
      return res.status(404).send({
        message: "No jobs found!",
      });
    }
    const jobs = await JobModel.deleteOne({ _id });
    if (!jobs) {
      return res.status(500).send({
        message: "Internal server error!",
      });
    }
    res.status(200).send({ message: "Job deleted successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};
