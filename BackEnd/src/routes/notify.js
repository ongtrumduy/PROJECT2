import express from "express";
import cors from "cors";
import getNotify from "../controllers/notify";
import bodyParser from "body-parser";


let router = express.Router();

let notifyRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/notify", cors(corsOptions), getNotify);

  return app.use("/", router);
}

module.exports = notifyRoutes;