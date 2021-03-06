import express from "express";
import cors from "cors";
import getUsertName from "../controllers/userdashboard";
import bodyParser from "body-parser";


let router = express.Router();

let registerRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/userdashboard", cors(corsOptions), getUsertName);

  return app.use("/", router);
}

module.exports = registerRoutes;