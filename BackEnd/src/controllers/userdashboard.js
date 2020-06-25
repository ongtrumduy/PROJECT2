import { user, friend, message, room, notify } from "../models/allmodels";


let ReceiveFistname = (req, res, next) => {
  // console.log(req.body);
  res.send(user.returnImediateUserInfor());
}
module.exports = ReceiveFistname;
