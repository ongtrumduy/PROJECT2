import { GetSocketId, EmitSocket, RemoveSocket } from "./beginsockets";
import { user, friend, message, room, notify } from "../APIs/allAPIs";


let AddUserList = io => {

  //======================================Begin=======================================================
  //====================================================================================================
  let usersocket = {};
  let nowuserid = 0;
  let logoutuserid = 0;
  io.on("connection", (socket) => {
    socket.on("sent-user-id", (data) => {
      nowuserid = data;
      usersocket = GetSocketId(usersocket, nowuserid, socket.id);
    })

    socket.on("disconnect-logout", (data) => {
      logoutuserid = data.userid;
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })

    socket.on("disconnect", (data) => {
      usersocket = RemoveSocket(usersocket, logoutuserid, socket.id);
    })
    //====================================================================================================
    //====================================================================================================


    //====================================================================================================
    //====================================================================================================
    socket.on("add-user-list", (data) => {
      // console.log(data)
      let adduserlist = friend.getAddUserList(data);
      // console.log(adduserlist);
      EmitSocket(usersocket, data, io, "receive-add-user-list", adduserlist);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("send-message-text", (data) => {
      // console.log(data);
      // console.log(data.friendid);
      console.log(data.data);
      // console.log(data.data.text);
      let roommine = room.returnRoom(data.data.userid, data.friendid).roomname;
      socket.join(roommine);

      message.addMessageToRoom(data.data.userid, data.friendid, data.data);
      let chatcontent = message.returnMessageContent(data.data.userid, data.friendid).content;

      EmitSocket(usersocket, data.data.userid, io, "receive-message-text", chatcontent);
      EmitSocket(usersocket, data.friendid, io, "receive-message-text", chatcontent);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;