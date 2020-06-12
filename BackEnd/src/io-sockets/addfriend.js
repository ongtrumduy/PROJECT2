import user from "../APIs/user";
import friend from "../APIs/friend";

let AddNewFriend = (io) => {
  let usersocket = {};
  let currentUserId = 0;
  io.on("connection", (socket) => {
    socket.on("sent-user-id", (data) => {
      console.log(data);
      currentUserId = data;
      console.log(currentUserId);
      if (usersocket[currentUserId]) {
        usersocket[currentUserId].push(socket.id);
      } else {
        usersocket[currentUserId] = [socket.id];
      }
      console.log(usersocket);

    })

    socket.on("disconnect-logout", (data) => {
      if (usersocket[currentUserId]) {
        usersocket[currentUserId] = usersocket[currentUserId].filter((socketId) => {
          return socketId !== socket.id;
        })
      }
    })

    socket.on("disconnect", (data) => {

      if (usersocket[currentUserId]) {
        usersocket[currentUserId] = usersocket[currentUserId].filter((socketId) => {
          return socketId !== socket.id;
        })
      }
    })

    socket.on("sent-add-friend", (data) => {
      console.log(data);
      let sentAddUserId = data.friendid;
      console.log(sentAddUserId);
      let adduserid = user.returnUserProfile(data.userid);
      console.log(adduserid);
      if (usersocket[sentAddUserId]) {
        usersocket[sentAddUserId].forEach(socketId => {
          socket.to(socketId).emit("add-friend-notify", adduserid);
        });
      }
    })
  })
}

module.exports = AddNewFriend;