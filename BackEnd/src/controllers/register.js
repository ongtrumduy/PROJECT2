import user from "../APIs/user";
import fs from "fs";


let GetRegister = (req, res, next) => {
  let Admin = {
    "check": "1",
    "username": "admin",
    "firstname": "admin",
    "lastname": "admin",
    "phonenumber": "0964980517",
    "password": "admin",
    "birth": "1999-03-31",
    "gender": "Nam",
    "id": 0,
    "avatar": null
  };

  let checkadmin = user.checkAdmin();
  if (checkadmin < 0) {
    user.createNewUser(Admin);
  }

  let UserProfile = []

  let checkRegister = false;

  let profile = fs.readFileSync("../BackEnd/src/databases/userProfile.json");
  if (profile) {
    UserProfile = JSON.parse(profile);
  }

  if (req.body.check == "1") {
    checkRegister = false;
  }
  if (Object.keys(req.body.username).length == 0 || Object.keys(req.body.firstname).length == 0 || Object.keys(req.body.lastname).length == 0 || Object.keys(req.body.phonenumber).length == 0 | Object.keys(req.body.password).length == 0 || Object.keys(req.body.birth).length == 0 || Object.keys(req.body.gender).length == 0) {
    res.send("0");
    checkRegister = true;
  }
  UserProfile.forEach(item => {
    if (item.username == req.body.username) {
      res.send("1");
      checkRegister = true;
    }
  })
  if (checkRegister === false) {
    res.send("2");
    user.createNewUser(req.body);
  }
}

module.exports = GetRegister;
