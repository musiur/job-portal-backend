const express = require("express");
const { getAllJobs, createJob, updateJob, deleteJob, getSingleJob } = require("../controllers/jobs.controller");
const JobRouter = express.Router();
JobRouter.get("/", getAllJobs);
JobRouter.get("/:_id", getSingleJob);
JobRouter.post("/", createJob);
JobRouter.patch("/:_id", updateJob);
JobRouter.delete("/:_id", deleteJob);
module.exports = JobRouter;
