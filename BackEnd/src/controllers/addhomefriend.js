import { user, friend, message, room, notify } from "../models/allmodels";



let AddHomeFriend = (req, res, next) => {

  res.send("1");
  // console.log(req.body);
  let index = friend.checkAddRequest(req.body.userid, req.body.friendid);

  if (req.body.status === 1 && index < 0) {

    let senderfirstname = user.returnUserProfile(req.body.userid).firstname;
    let senderlastname = user.returnUserProfile(req.body.userid).lastname;

    notify.addNewNotify(req.body.friendid, req.body.userid, senderfirstname, senderlastname, "addfriend");
    let checkroom = friend.checkAddToRoom(req.body.userid, req.body.friendid);
    if (checkroom === true) {
      notify.createBecameFriendNotify(req.body.userid, req.body.friendid);
    }

  } else if (req.body.status === 0 && index >= 0) {
    friend.cancelAddRequest(req.body.userid, req.body.friendid);
    notify.deleteNotify(req.body.friendid, req.body.userid, "addfriend");

  }
}

module.exports = AddHomeFriend;
