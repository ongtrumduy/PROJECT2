import express from "express";
import cors from "cors";
import receiveProfile from "../controllers/profile";
import bodyParser from "body-parser";


let router = express.Router();

let profileRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/profile", cors(corsOptions), receiveProfile);

  return app.use("/", router);
}

module.exports = profileRoutes;