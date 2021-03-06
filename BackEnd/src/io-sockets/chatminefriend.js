import { GetSocketId, EmitSocket, RemoveSocket, RemoveDisconnectSocket } from "../io-sockets/beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";


let ChatMineFriend = io => {

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
    socket.on("mine-and-friend-chat", (data) => {
      // console.log(data);
      // let roommine = room.returnRoom(data.userid, data.friendid).roomname;
      // socket.join(roommine);
      // console.log(roommine);
      let chatcontent = message.returnMessageContent(data.userid, data.friendid).content;
      // console.log(chatcontent);

      // EmitSocket(usersocket, data.userid, io, "receive-data-conversation", chatcontent);
      // EmitSocket(usersocket, data.friendid, io, "receive-data-conversation", chatcontent);
      // io.sockets.in(roommine).emit("receive-data-conversation", chatcontent);
      // EmitRoomSocket(roommine, io, "receive-data-conversation", chatcontent)
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = ChatMineFriend;