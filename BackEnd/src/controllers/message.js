import { user, friend, message, room, notify } from "../models/allmodels";


let receiveMessage = (req, res, next) => {

  let chatcontent = message.returnMessageContent(req.body.userid, req.body.friendid).content;
  res.send(chatcontent);
}

module.exports = receiveMessage;
