import { user, friend, message, room, notify } from "../models/allmodels";


let ReceiveInfor = (req, res, next) => {
  // console.log("Trả lên");
  // console.log(req.body.userid);
  let index = user.nowInforUnknow(req.body.userid);
  // console.log(index);
  if (index < 0) {
    res.send("-1");
  } else {
    let indexcheck = friend.checkAddRequest(req.body.userid, index);
    if (indexcheck >= 0) {
      let unknowuser = {
        user: user.returnUserProfile(index),
        checkrequest: 1
      }
      res.send(unknowuser);
      // console.log(unknowuser);
    } else {
      let unknowuser = {
        user: user.returnUserProfile(index),
        checkrequest: 0
      }
      res.send(unknowuser);
      // console.log(unknowuser);
    }
  }
}

module.exports = ReceiveInfor;


