import user from "../APIs/user";
import friend from "../APIs/friend";
import fs from "fs";


let ReceiveFistname = (req, res, next) => {
  let UserFriend = [];

  let friendlist = fs.readFileSync("../BackEnd/src/databases/userFriend.json");
  if (friendlist) {
    UserFriend = JSON.parse(friendlist);
  }
  if (req.body.status === 1) {
    friend.createNewFriend(req.body);
  } else {
    console.log("ĐÃ hủy");
  }
  // res.send(user.nowInforProfile());
}
module.exports = ReceiveFistname;
