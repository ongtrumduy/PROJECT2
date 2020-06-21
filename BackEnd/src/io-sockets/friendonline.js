import { GetSocketId, EmitSocket, AppearUseridSocket, RemoveSocket } from "./beginsockets";
import { user, friend, message, room, notify } from "../models/allAPIs";


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
      let friendidlist = friend.getFriendIdList(nowuserid);
      console.log(friendidlist)
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
    socket.on("send-friend-online", data => {
      console.log(data);
      console.log(usersocket);
      let friendonlinelist = AppearUseridSocket(usersocket, data);
      // let friendonlinelist = AppearUseridSocket(usersocket, data);
      console.log(friendonlinelist)
      EmitSocket(usersocket, data, io, "receive-friend-online", friendonlinelist);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;