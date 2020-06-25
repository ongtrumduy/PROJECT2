import express from "express";
import cors from "cors";
import getFriendList from "../controllers/friendlist";
import bodyParser from "body-parser";


let router = express.Router();

let getFriendRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/chatfriendlist", cors(corsOptions), getFriendList);

  return app.use("/", router);
}

module.exports = getFriendRoutes;