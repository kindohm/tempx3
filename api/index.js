require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const port = 5150;
const { Sequelize, Op } = require("sequelize");
const readingModel = require("./models/reading");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const homeIP = process.env.HOME_IP;
const serverIP = "http://104.131.30.210";

const Reading = readingModel(sequelize, Sequelize.DataTypes);

const isProd = process.env.NODE_ENV === "production";
console.log("isProd", isProd);

const localOrigins = [
  "http://localhost:3000",
  "http://localhost:5151",
  "http://localhost:8080",
  homeIP,
];
const postOrigins = [serverIP].concat(!isProd ? localOrigins : [homeIP]);

const getOrigins = localOrigins.concat([serverIP]);

console.log("origins", getOrigins, postOrigins);

const getOptions = {
  origin: getOrigins,
};

const postOptions = { origin: postOrigins };

app.use(express.json());

app.get("/readings", cors(getOptions), async (req, res) => {
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const readings = await Reading.findAll({
    shere: { createdAt: { [Op.gte]: yesterday } },
    order: [["createdAt", "DESC"]],
    limit: 50,
  });
  res.send(readings);
});

app.post("/readings", cors(postOptions), async (req, res) => {
  const { body } = req;
  const { temperature, humidity, pressure } = body;
  if (!temperature || !humidity || !pressure) {
    res.status(400).send({
      message: "temperature, humidity, and pressure attributes are required.",
    });
    return;
  }

  const reading = await Reading.create({ temperature, humidity, pressure });
  res.json(reading);
});

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
