import axios from "axios";

const username = process.env.REACT_APP_API_KEY;
const password = "";

const base64Credentials = Buffer.from(`${username}:${password}`).toString(
  "base64"
); // this is somehow giving wrong string below is the actual string

const derivedBase64Credentials =
  "Y2EwNGZiMzUtOWRhZS00OTlhLTgwNWYtZjM1ZDc5NDk1NTUxOg==";

export const getJobs = async (keyword) => {
  const apiUrl = `https://www.reed.co.uk/api/1.0/search?keywords=${
    !keyword ? "software" : keyword
  }`;

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Basic ${derivedBase64Credentials}`,
      "Content-Type": "application/json",
    },
  });
  return response.data.results;
};

export const getJobById = async (id) => {
  const apiUrl = `https://www.reed.co.uk/api/1.0/jobs/${id}`;

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Basic ${derivedBase64Credentials}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
