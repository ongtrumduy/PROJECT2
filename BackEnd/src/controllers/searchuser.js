import user from "../APIs/user";


let ReceiveInfor = (req, res, next) => {
  let index = user.searchUserProfile(req.body);
  if (index >= 0) {
    if (req.body.username === "admin") {
      res.send("0");
    } else {
      let seacrhinfor = {
        friendid: index
      }
      res.send(seacrhinfor);
    }
    // console.log(seacrhinfor);
  } else {
    res.send("0");
  }
}

module.exports = ReceiveInfor;
