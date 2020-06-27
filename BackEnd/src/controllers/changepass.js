import { user, friend, message, room, notify } from "../models/allmodels";


let ChangePass = (req, res, next) => {
  let checkoldpass = user.getPassWordUserNow(req.body.userid);
  if (Object.keys(req.body.oldpassword).length == 0 || Object.keys(req.body.newpassword).length == 0 || Object.keys(req.body.repeatpassword).length == 0) {
    res.send("0");
  }
  else if (checkoldpass !== req.body.oldpassword) {
    res.send("1");
  }
  else if (req.body.newpassword !== req.body.repeatpassword) {
    res.send("2");
  }
  else {
    user.setChangePassWord(req.body);
    res.send("3");
  }

}

module.exports = ChangePass;
