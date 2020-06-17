import { user, friend, message, room, notify } from "../APIs/allAPIs";



let GetNotify = (req, res, next) => {

  let GetUserNotify = notify.returnUserNotify(req.body.userid);
  // console.log(req.body);
  // console.log(GetUserNotify);
  // console.log(GetUserNotify.notifycontent);
  let GetNotifyContent = GetUserNotify.notifycontent;
  res.send(GetNotifyContent);

}

module.exports = GetNotify;
