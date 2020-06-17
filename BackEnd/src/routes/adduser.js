import express from "express";
import cors from "cors";
import getAddUserList from "../controllers/adduser";
import bodyParser from "body-parser";


let router = express.Router();

let addUserRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/adduserlist", cors(corsOptions), getAddUserList);

  return app.use("/", router);
}

module.exports = addUserRoutes;