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

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5151']
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/readings", async (req, res) => {
  const readings = await Reading.findAll();
  res.send(readings);
});

app.post("/readings", async (req, res) => {
  const { body } = req;
  const { temperature } = body;
  if (!temperature) {
    res.status(400).send({message: 'temperature attribute is required.'})
    return;
  }

  const reading = await Reading.create({ temperature });
  res.json(reading);
});

app.get("/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.send("nope");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.send("error " + JSON.stringify(error));
  }
});

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
