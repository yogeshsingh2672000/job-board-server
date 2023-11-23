import express from "express";
import cors from "cors";
import { config } from "dotenv";
import fetch from "node-fetch";

config(); // Load environment variables from .env file

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

const username = process.env.REACT_APP_API_KEY;
const password = "";

app.get("/", async (req, res) => {
  res.send("working");
});

app.get("/api/jobs", async (req, res) => {
  console.log("/api/jobs");
  const { keyword } = req.query;

  const apiUrl = `https://www.reed.co.uk/api/1.0/search?keywords=${
    !keyword ? "software" : keyword
  }`;

  try {
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("response sent");
    res.json(data.results);
  } catch (error) {
    console.log("Error while making request", error);
  }
});

app.get("/api/job/:id", async (req, res) => {
  console.log("/api/job/:id");
  const { id } = req.params;

  const apiUrl = `https://www.reed.co.uk/api/1.0/jobs/${id}`;

  try {
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("response sent");
    res.json(data);
  } catch (error) {
    console.log("Error while making request", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
