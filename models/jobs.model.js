const mongoose = require("mongoose");
const { JobSchema } = require("../schemas/jobs.schema");

const JobModel = new mongoose.model("jobs",JobSchema);

module.exports = JobModel;
