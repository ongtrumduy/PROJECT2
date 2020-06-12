import user from "../APIs/user";
import fs from "fs";


let ReceiveInfor = (req, res, next) => {
  let index = user.searchUserProfile(req.body);
  if (index >= 0) {
    let seacrhinfor = {
      friendid: user.searchUserProfileId()
    }
    res.send(seacrhinfor);
    // console.log(seacrhinfor);
  } else {
    res.send("0");
  }
}

module.exports = ReceiveInfor;
