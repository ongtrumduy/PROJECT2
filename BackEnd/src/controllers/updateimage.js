import { user, friend, message, room, notify } from "../models/allmodels";
import multer from "multer";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }

})

var upload = multer({ storage: storage })

let updateImageUser = (req, res, next) => {
  console.log("Ảnh update lên server");
  console.log(req.file);
}

module.exports = updateImageUser;
