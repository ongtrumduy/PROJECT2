import { user, friend, message, room, notify } from "../models/allmodels";


let GetLogin = (req, res, next) => {
  let index = user.positionLogin(req.body);
  if (index >= 0) {
    if (req.body.username === "admin" && req.body.password === "admin") {
      let NowInfor = {
        position: "admin",
        userid: index
      }
      res.send(NowInfor);
    } else {
      let NowInfor = {
        position: "user",
        userid: index
      }
      res.send(NowInfor);
    }
  } else {
    res.send("0");
  }
}

module.exports = GetLogin;
