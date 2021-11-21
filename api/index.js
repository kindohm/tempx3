require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    res.send("successsssss");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.send("error " + JSON.stringify(error));
  }
});


app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
