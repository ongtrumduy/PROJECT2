import { GetSocketId, EmitSocket, RemoveSocket, RemoveDisconnectSocket } from "../io-sockets/beginsockets";
import { user, friend, message, room, notify } from "../models/allmodels";

let ChatFriendList = io => {

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
    socket.on("sent-add-friend", (data) => {
      // console.log("ID của cái add friend");
      // console.log(socket.id);
      // console.log(data);
      let friendroomid = data.friendid;
      // let userroomid = data.userid;
      // let roomname = user.createNewRoom(userroomid, friendroomid);
      let adduserid = user.returnUserProfile(data.userid);

      EmitSocket(usersocket, friendroomid, io, "add-friend-notify", adduserid);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = ChatFriendList;