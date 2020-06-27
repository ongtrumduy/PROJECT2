import { user, friend, message, room, notify } from "../models/allmodels";


let getIndexFriend = (req, res, next) => {
  let indexfriend = {
    friendcount: user.getChatFriendList(req.body.userid).length,
    waitcount: user.getWaitUserList(req.body.userid).length,
    addcount: user.getAddUserList(req.body.userid).length,
  }

  res.send(indexfriend);
}

module.exports = getIndexFriend;


