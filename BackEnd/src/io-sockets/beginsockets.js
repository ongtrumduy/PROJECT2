import { user, friend, message, room, notify } from "../models/allmodels";

export let GetSocketId = (usersocket, userid, socketid) => {
  // console.log("Id của cái userdashboard");
  // console.log(socket.id);
  // socket.join("TEST");
  // console.log(socket.adapter.rooms);
  // console.log(data);
  if (usersocket[userid]) {
    usersocket[userid].push(socketid);
  } else {
    usersocket[userid] = [socketid];
  }
  return usersocket;
}


export let EmitSocket = (usersocket, userid, io, event, data) => {
  if (usersocket[userid]) {
    usersocket[userid].forEach(socketId => {
      //   console.log(socketId);
      //   console.log(typeof (socketId));
      // socket.to("TEST").emit("add-friend-notify", adduserid);
      return io.sockets.in(socketId).emit(event, data);
    });
  }
}


export let AppearUseridSocket = (usersocket, userid) => {
  let chatfriendlist = friend.getChatFriendList(userid);
  // console.log(chatfriendlist);
  let appearlist = [];

  chatfriendlist.forEach(item => {
    if (usersocket[item.friendid]) {
      let friendinfor = {
        friendid: item.friendid,
        friendlastname: item.friendlastname,
        friendfirstname: item.friendfirstname
      }
      appearlist.push(friendinfor);
    }
  })

  return appearlist;
}


export let RemoveSocket = (usersocket, userid, socketid) => {
  if (usersocket[userid]) {
    usersocket[userid] = usersocket[userid].filter(socketId => {
      return socketId !== socketid;
    })
    if (!usersocket[userid].length) {
      delete usersocket[userid];
    }
  }
  return usersocket;
}


export let RemoveDisconnectSocket = (usersocket, data, useronlinelist, socketid) => {
  if (data === "transport close") {
    useronlinelist.forEach(itemid => {
      if (usersocket[itemid]) {
        usersocket[itemid] = usersocket[itemid].filter(socketId => {
          return socketId !== socketid;
        })
        if (!usersocket[itemid].length) {
          delete usersocket[itemid];
        }
      }
    })
  }
  return usersocket;
}