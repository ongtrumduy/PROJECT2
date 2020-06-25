import { user, friend, message, room, notify } from "../models/allmodels";



let ReceiveAddUserList = (req, res, next) => {
  // console.log("nhận về chatlist id");
  // console.log(req.body.userid);
  let adduserlist = friend.getAddUserList(req.body.userid);
  // console.log(adduserlist);
  res.send(adduserlist);
}

module.exports = ReceiveAddUserList;
