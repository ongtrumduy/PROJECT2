import { user, friend, message, room, notify } from "../APIs/allAPIs";


let receiveMessage = (req, res, next) => {

  let chatcontent = message.returnMessageContent(req.body.userid, req.body.friendid).content;
  res.send(chatcontent);
}

module.exports = receiveMessage;
