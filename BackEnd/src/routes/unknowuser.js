import express from "express";
import cors from "cors";
import unknowUserProfile from "../controllers/unknowuser";
import bodyParser from "body-parser";


let router = express.Router();

let profileRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/unknowprofile", cors(corsOptions), unknowUserProfile);

  return app.use("/", router);
}

module.exports = profileRoutes;