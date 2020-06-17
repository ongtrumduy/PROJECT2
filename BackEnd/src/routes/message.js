import express from "express";
import cors from "cors";
import receiveMessage from "../controllers/message";
import bodyParser from "body-parser";


let router = express.Router();

let messageRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/message", cors(corsOptions), receiveMessage);

  return app.use("/", router);
}

module.exports = messageRoutes;