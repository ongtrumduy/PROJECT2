import user from "../APIs/user";
import friend from "../APIs/friend";
import fs from "fs";


let SearchInfor = (req, res, next) => {
  let userid = user.positionUserProfileId();
  let searchfriendid = user.searchUserProfileId();
  let index = friend.checkAddRequest(userid, searchfriendid);
  if (index >= 0) {
    let unknowuser = {
      user: user.nowSearchProfile(),
      checkrequest: 1
    }
    res.send(unknowuser);
    // console.log(unknowuser);
  } else {
    let unknowuser = {
      user: user.nowSearchProfile(),
      checkrequest: 0
    }
    res.send(unknowuser);
    // console.log(unknowuser);
  }
}

module.exports = SearchInfor;
