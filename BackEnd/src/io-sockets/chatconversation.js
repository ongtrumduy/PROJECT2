import { GetSocketId, EmitSocket, RemoveSocket, RemoveDisconnectSocket } from "../io-sockets/beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";
import moment from "moment";


let AddUserList = io => {

  //======================================Begin=======================================================
  //====================================================================================================
  let usersocket = {};
  let useronlinelist = [];
  let nowuserid = 0;
  let logoutuserid = 0;
  io.on("connection", (socket) => {
    socket.on("sent-user-id", (data) => {
      nowuserid = data;
      usersocket = GetSocketId(usersocket, nowuserid, socket.id);
      useronlinelist = Object.keys(usersocket);
      // console.log(usersocket);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })

    socket.on("disconnect", (data) => {
      RemoveDisconnectSocket(usersocket, data, useronlinelist, socket.id);
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("add-user-list", (data) => {
      // console.log(data)
      let adduserlist = user.getAddUserList(data);
      // console.log(adduserlist);
      EmitSocket(usersocket, data, io, "receive-add-user-list", adduserlist);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("send-message-text", (data) => {
      // console.log(data);
      // console.log(data.friendid);
      // console.log(data.data);
      // console.log(data.data.text);
      // let roommine = room.returnRoom(data.data.userid, data.friendid).roomname;
      // socket.join(roommine);
      let time = moment().format("HH:mm DD-MM-YYYY");
      let datamessage = {
        userid: data.data.userid,
        text: data.data.text,
        date: time
      }

      // console.log(datamessage);

      message.addMessageToRoom(data.data.userid, data.friendid, datamessage);
      let chatcontent = {
        content: message.returnMessageContent(data.data.userid, data.friendid).content,
        user1id: data.friendid,
        user2id: data.data.userid
      }

      EmitSocket(usersocket, data.data.userid, io, "receive-message-text", chatcontent);
      EmitSocket(usersocket, data.friendid, io, "receive-message-text", chatcontent);

    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;