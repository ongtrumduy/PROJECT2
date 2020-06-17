import { user, friend, message, room, notify } from "../APIs/allAPIs";



let ReceiveFistname = (req, res, next) => {
  // console.log(req.body);
  let index = friend.checkAddRequest(req.body.userid, req.body.friendid);

  if (req.body.status === 1 && index < 0) {
    friend.createNewFriend(req.body);

    let senderfirstname = user.returnUserProfile(req.body.userid).firstname;
    let senderlastname = user.returnUserProfile(req.body.userid).lastname;

    notify.addNewNotify(req.body.friendid, req.body.userid, senderfirstname, senderlastname, "addfriend");
    // console.log("Đã thêm vào");
    // console.log(UserFriend);
    res.send("1");
  } else if (req.body.status === 0 && index >= 0) {
    friend.cancelAddRequest(req.body.userid, req.body.friendid);
    notify.deleteNotify(req.body.friendid, req.body.userid, "addfriend");
    // console.log("Đã hủy");
    // console.log(UserFriend);
    res.send("0");
  }
}

module.exports = ReceiveFistname;
