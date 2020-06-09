import user from "../APIs/user";
import fs from "fs";


let GetLogin = (req, res, next) => {
  let UserProfile = [];

  let profile = fs.readFileSync("../BackEnd/src/databases/userProfile.json");
  if (profile) {
    UserProfile = JSON.parse(profile);
  }

  let index = user.positionLogin(req.body);
  if (index >= 0) {
    if (req.body.user === "admin" && req.body.password === "admin") {
      res.send("admin");
    } else {
      res.send("user");
    }
  } else {
    res.send("0");
  }
}

module.exports = GetLogin;
