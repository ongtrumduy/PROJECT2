import express from "express";
import cors from "cors";
import getFriendRequest from "../controllers/addfriend";
import bodyParser from "body-parser";


let router = express.Router();

let addFriendRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/addfriend", cors(corsOptions), getFriendRequest);

  return app.use("/", router);
}

module.exports = addFriendRoutes;