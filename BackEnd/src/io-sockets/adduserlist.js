import { GetSocketId, EmitSocket, RemoveSocket } from "../io-sockets/begin-sockets";
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
      console.log(data)
      let adduserlist = friend.getAddUserList(data);
      // console.log(adduserlist);
      EmitSocket(usersocket, data, io, "receive-add-user-list", adduserlist);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("add-user-agree-list", (data) => {
      console.log(data)
      friend.createNewFriend(data);
      notify.createBecameFriendNotify(data.userid, data.friendid);
      message.createNewRoom(data.userid, data.friendid);
    })
    //====================================================================================================

    //====================================================================================================
    socket.on("add-user-deny-list", (data) => {
      // console.log(data)
      friend.cancelAddRequest(data.userid, data.friendid);
    })
    //====================================================================================================
    //====================================================================================================


  })
}

module.exports = AddUserList;