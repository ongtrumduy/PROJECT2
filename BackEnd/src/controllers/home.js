import user from "../APIs/user";
import fs from "fs";


let ReceiveInfor = (req, res, next) => {
  res.send(user.nowInforUnknow());
}

module.exports = ReceiveInfor;
