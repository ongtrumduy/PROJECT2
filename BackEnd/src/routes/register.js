import express from "express";
import cors from "cors";
import getRegister from "../controllers/register";
import bodyParser from "body-parser";


let router = express.Router();

let registerRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/register", cors(corsOptions), getRegister);

  return app.use("/", router);
}

module.exports = registerRoutes;