import { user, friend, message, room, notify } from "../APIs/allAPIs";


let ReceiveChatFriend = (req, res, next) => {
  console.log("nhận về id");
  console.log(req.body.userid);
  let chatfriendlist = friend.getChatFriendList(req.body.userid);
  console.log(chatfriendlist);
  res.send(chatfriendlist);
}

module.exports = ReceiveChatFriend;
