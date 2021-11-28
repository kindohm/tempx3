require("dotenv").config();

const cors = require('cors');
const express = require("express");
const app = express();
const port = 5150;
const { Sequelize } = require("sequelize");
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

const Reading = readingModel(sequelize, Sequelize.DataTypes);

const isProd = process.env.NODE_ENV === 'production'
console.log('isProd', isProd);
const origins = ['http://104.131.30.210'].concat(!isProd ? ['http://localhost:3000', 'http://localhost:5151'] : []);
console.log('origins', origins);

const corsOptions = {
  origin: origins
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/readings", async (req, res) => {
  const readings = await Reading.findAll();
  res.send(readings);
});

app.post("/readings", async (req, res) => {
  const { body } = req;
  const { temperature, humidity, pressure } = body;
  if (!temperature || !humidity || !pressure) {
    res.status(400).send({message: 'temperature, humidity, and pressure attributes are required.'})
    return;
  }

  const reading = await Reading.create({ temperature, humidity, pressure });
  res.json(reading);
});

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
