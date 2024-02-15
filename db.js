const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config({
  path: ".env",
});

const mongoURI = process.env.MONGODB;

const initializeDatabase = () => {
  if (!mongoURI) {
    console.error("Environment variables not defined");
  } else {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.error("Error while connecting database", error);
      });
  }
};

module.exports = initializeDatabase;
