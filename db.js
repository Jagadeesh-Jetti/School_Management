const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config({
  path: ".env",
});

const MONGOURL = process.env.MONGODB;

const initializeDatabase = () => {
  if (!MONGOURL) {
    console.error("Environment variables not defined");
  } else {
    mongoose
      .connect(MONGOURL)
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.error("Error while connecting database", error);
      });
  }
};

module.exports = initializeDatabase;
