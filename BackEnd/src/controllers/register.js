import { user, friend, message, room, notify } from "../APIs/allAPIs";


let GetRegister = (req, res, next) => {

  user.creatUserAdmin();

  let checkRegister = false;

  if (req.body.check == "1") {
    checkRegister = false;
  }

  if (Object.keys(req.body.username).length == 0 || Object.keys(req.body.firstname).length == 0 || Object.keys(req.body.lastname).length == 0 || Object.keys(req.body.phonenumber).length == 0 | Object.keys(req.body.password).length == 0 || Object.keys(req.body.birth).length == 0 || Object.keys(req.body.gender).length == 0) {
    res.send("0");
    checkRegister = true;
  }

  let checkusername = user.checkRegisterUsername(req.body);
  if (checkusername >= 0) {
    res.send("1");
    checkRegister = true;
  }

  if (checkRegister === false) {
    res.send("2");
    user.createNewUser(req.body);
    let index = user.positionLogin(req.body);
    notify.createNewNotify(index);
  }
}

module.exports = GetRegister;
