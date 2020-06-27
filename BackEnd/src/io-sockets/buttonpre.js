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
    socket.on("button-pre-unknow-user", (data) => {
      // console.log(data)
      let preunknowfriend = {
        user: user.getPreUnknownFriend(data.userid, data.friendid),
        checkrequest: 0
      }
      // console.log(preunknowfriend);
      EmitSocket(usersocket, data.userid, io, "receive-button-pre-unknow-user", preunknowfriend);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;