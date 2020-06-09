import user from "../APIs/user";
import fs from "fs";


let ReceiveInfor = (req, res, next) => {
  let index = user.searchUserProfile(req.body);
  if (index >= 0) {
    res.send("1");
  } else {
    res.send("0");
  }
}

module.exports = ReceiveInfor;
