import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { getAllJobs, getJob } from "./controllers/jobController.js";

config(); // Load environment variables from .env file

const app = express();
const port = 3005;

app.use(express.json());

const whitelist = [
  "https://job-board-lemon.vercel.app",
  "http://localhost:3005",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin is in the whitelist
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/api/jobs", getAllJobs);
app.get("/api/job/:id", getJob);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
