import user from "../APIs/user";
import fs from "fs";


let ReceiveInfor = (req, res, next) => {
  res.send(user.returnUserProfile(req.body.userid));
}

module.exports = ReceiveInfor;
