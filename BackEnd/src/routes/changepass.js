import express from "express";
import cors from "cors";
import getChangePass from "../controllers/changepass";
import bodyParser from "body-parser";


let router = express.Router();

let changepassRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/changepassword", cors(corsOptions), getChangePass);

  return app.use("/", router);
}

module.exports = changepassRoutes;