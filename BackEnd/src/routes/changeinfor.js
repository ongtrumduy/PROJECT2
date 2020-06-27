import express from "express";
import cors from "cors";
import getChangeInfor from "../controllers/changeinfor";
import bodyParser from "body-parser";


let router = express.Router();

let changeinforRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/changeinfor", cors(corsOptions), getChangeInfor);

  return app.use("/", router);
}

module.exports = changeinforRoutes;