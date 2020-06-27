import express from "express";
import cors from "cors";
import addHomeFriend from "../controllers/addhomefriend";
import bodyParser from "body-parser";


let router = express.Router();

let addFriendRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/addhomefriend", cors(corsOptions), addHomeFriend);

  return app.use("/", router);
}

module.exports = addFriendRoutes;