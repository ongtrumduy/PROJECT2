import user from "../APIs/user";
import friend from "../APIs/friend";
import fs from "fs";


let ReceiveFistname = (req, res, next) => {
  // console.log(req.body);
  let UserFriend = [];

  let friendlist = fs.readFileSync("../BackEnd/src/databases/userFriend.json");
  if (friendlist) {
    UserFriend = JSON.parse(friendlist);
  }

  let userid = user.positionUserProfileId();
  let searchfriendid = user.searchUserProfileId();
  let index = friend.checkAddRequest(userid, searchfriendid);

  if (req.body.status === 1 && index < 0) {
    friend.createNewFriend(req.body);
    // console.log("Đã thêm vào");
    // console.log(UserFriend);
    res.send("1");
  } else if (req.body.status === 0 && index >= 0) {
    friend.cancelAddRequest(req.body.userid, req.body.friendid)
    // console.log("Đã hủy");
    // console.log(UserFriend);
    res.send("0");
  }
}

module.exports = ReceiveFistname;
