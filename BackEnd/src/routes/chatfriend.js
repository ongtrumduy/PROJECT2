import express from "express";
import cors from "cors";
import getChatFriendList from "../controllers/chatfriend";
import bodyParser from "body-parser";


let router = express.Router();

let addUserRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/chatfriendlist", cors(corsOptions), getChatFriendList);

  return app.use("/", router);
}

module.exports = addUserRoutes;