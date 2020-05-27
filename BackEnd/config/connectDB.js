import mongoose from "mongoose";
import bluebird from "bluebird";

// Connect to MongoDB

let connectDB = () => {
  mongoose.Promise = bluebird;

  let DB_CONNECTION = "mongodb";
  let DB_HOST = "localhost";
  let DB_PORT = "27017";
  let DB_NAME = "lovechat";
  let DB_USERNAME = "";
  let DB_PASSWORD = "";

  let URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

};

module.exports = connectDB;