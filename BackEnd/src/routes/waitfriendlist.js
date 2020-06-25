import express from "express";
import cors from "cors";
import getWaitFriendList from "../controllers/waitfriendlist";
import bodyParser from "body-parser";


let router = express.Router();

let waitFriendRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/chatfriendlist", cors(corsOptions), getWaitFriendList);

  return app.use("/", router);
}

module.exports = waitFriendRoutes;