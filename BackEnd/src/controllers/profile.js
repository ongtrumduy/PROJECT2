import user from "../APIs/user";
import fs from "fs";


let ReceiveInfor = (req, res, next) => {
  res.send(user.nowInforProfile())
}

module.exports = ReceiveInfor;
