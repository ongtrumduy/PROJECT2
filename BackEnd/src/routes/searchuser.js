import express from "express";
import cors from "cors";
import searchUserProfile from "../controllers/searchuser";
import bodyParser from "body-parser";


let router = express.Router();

let profileRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/searchuser", cors(corsOptions), searchUserProfile);

  return app.use("/", router);
}

module.exports = profileRoutes;