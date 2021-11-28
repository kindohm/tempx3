require("dotenv").config();
const axios = require("axios");
const { getReadings } = require("./getReadings");
const postUrl = process.env.POST_URL;
const postInterval = process.env.INTERVAL;

const postReadings = async (data) => {
  const result = await axios.post(postUrl, data);
  return result.data;
};

const measureAndPost = async () => {
  try {
    console.log(`--- taking readings ${(new Date).toISOString()} ---`);
    const readings = await getReadings();
    console.log(readings)
    const result = await postReadings(readings);
    console.log("posted readings to API");
    console.log(result);
  } catch (err) {
    console.error("Error measuring temperature or posting reading");
    console.error(err);
  } finally {
    setTimeout(measureAndPost, postInterval);
  }
};

console.log("running");
setTimeout(measureAndPost, postInterval);
