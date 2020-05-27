import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "../config/connectDB";
import UserModel from "./models/user-model";

let app = express();

ConnectDB();

app.use(cors());

let corsOptions = {
  body: "*",
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());

app.get("/user", cors(corsOptions), async (req, res, next) => {
  try {
    let item = {
      username: "Nguyễn Chiêu"
    };
    console.log(UserModel.createNew(item));
    let user = await UserModel.createNew(item);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
})

let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log(
    "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
    host,
    port
  );
});
