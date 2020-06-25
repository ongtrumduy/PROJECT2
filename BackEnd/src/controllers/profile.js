import { user, friend, message, room, notify } from "../models/allmodels";



let ReceiveInfor = (req, res, next) => {
  res.send(user.returnUserProfile(req.body.userid));
}

module.exports = ReceiveInfor;
