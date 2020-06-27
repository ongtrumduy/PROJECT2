import { user, friend, message, room, notify } from "../models/allmodels";



let ChangeInfor = (req, res, next) => {
  // console.log(req.body);
  if (Object.keys(req.body.firstname).length == 0 || Object.keys(req.body.lastname).length == 0 || Object.keys(req.body.phonenumber).length == 0 || Object.keys(req.body.birth).length == 0 || Object.keys(req.body.gender).length == 0) {
    res.send("0");
  }
  else{
    user.setChangeInfor(req.body);
    res.send("1");
  }

}

module.exports = ChangeInfor;
