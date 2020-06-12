import user from "../APIs/user";
import friend from "../APIs/friend";


let SearchInfor = (req, res, next) => {
  let index = friend.checkAddRequest(req.body.userid, req.body.friendid);
  if (index >= 0) {
    let unknowuser = {
      user: user.returnUserProfile(req.body.friendid),
      checkrequest: 1
    }
    res.send(unknowuser);
    // console.log(unknowuser);
  } else {
    let unknowuser = {
      user: user.returnUserProfile(req.body.friendid),
      checkrequest: 0
    }
    res.send(unknowuser);
    // console.log(unknowuser);
  }
}

module.exports = SearchInfor;
