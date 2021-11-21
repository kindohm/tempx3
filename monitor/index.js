require("dotenv").config();
const axios = require("axios");
const { getTemperatureReading } = require("./getTemperatureReading");
const postUrl = process.env.POST_URL;
const postInterval = process.env.INTERVAL;

const postReading = async (temperature) => {
  const payload = { temperature };
  const result = await axios.post(postUrl, payload);
  return result.data;
};

const measureAndPost = async () => {
  try {
    console.log('measuring and posting...');
    const temperature = await getTemperatureReading();
    const result = await postReading(temperature);
    console.log("success");
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
