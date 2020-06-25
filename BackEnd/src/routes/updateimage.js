import express from "express";
import cors from "cors";
import updateImageUser from "../controllers/updateimage";
import bodyParser from "body-parser";
import { user, friend, message, room, notify } from "../models/allmodels";
import multer from "multer";

let router = express.Router();

let updateimageRoutes = (app, corsOptions) => {

  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../images")
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }

  })

  let upload = multer({ storage: storage });

  // let updateImageUser = (req, res, next) => {
  //   console.log("Ảnh update lên server");
  //   console.log(req.file);
  // }
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/updateimage", upload.single("file"), cors(corsOptions), (req, res) => {
    console.log("Ảnh update lên server");
    console.log(req.body.data);
    res.send(req.file);
  });

  return app.use("/", router);
}

module.exports = updateimageRoutes;