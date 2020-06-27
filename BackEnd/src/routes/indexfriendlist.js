import express from "express";
import cors from "cors";
import getIndexFriendList from "../controllers/indexfriendlist";
import bodyParser from "body-parser";


let router = express.Router();

let indexfriendRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/friendlist", cors(corsOptions), getIndexFriendList);

  return app.use("/", router);
}

module.exports = indexfriendRoutes;