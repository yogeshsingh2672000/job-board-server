import { getJobs, getJobById } from "../models/jobModels.js";

export async function getAllJobs(req, res) {
  console.log("/api/jobs");
  const { keyword } = req.query;

  try {
    const jobs = await getJobs(keyword);
    console.log("response sent");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getJob(req, res) {
  console.log("/api/job/:id");
  const { id } = req.params;

  try {
    const job = await getJobById(id);
    console.log("response sent");
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
