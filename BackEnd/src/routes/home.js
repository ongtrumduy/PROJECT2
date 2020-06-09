import express from "express";
import cors from "cors";
import getInforUnknown from "../controllers/home";
import bodyParser from "body-parser";


let router = express.Router();

let loginRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/home", cors(corsOptions), getInforUnknown);

  return app.use("/", router);
}

module.exports = loginRoutes;