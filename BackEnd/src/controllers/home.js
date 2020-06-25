import { user, friend, message, room, notify } from "../models/allmodels";


let ReceiveInfor = (req, res, next) => {
  // console.log("Trả lên");
  // console.log(req.body.userid);
  let index = user.nowInforUnknow(req.body.userid);
  // console.log(index);
  if (index < 0) {
    res.send("-1");
  } else {
    res.send(user.returnUserProfile(index));
  }
}

module.exports = ReceiveInfor;
