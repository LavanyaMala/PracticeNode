const express = require("express");
const { getJobs, newJob, updateJob,deleteJob,getJobById, statsJob } = require("../controller/jobcontroller");
const router = express.Router();

router.route("/jobs").get(getJobs);

router.route("/job/new").post(newJob);

router.route("/updatejob/:id").put(updateJob);

router.route("/deletejob/:id").delete(deleteJob);

router.route("/findByIdJob/:id/:slug").get(getJobById);

router.route("/stats/job/:topic").get(statsJob);


 


module.exports = router;


