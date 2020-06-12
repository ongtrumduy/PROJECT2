import friend from "../APIs/friend";


let ReceiveFistname = (req, res, next) => {
  // console.log(req.body);
  let index = friend.checkAddRequest(req.body.userid, req.body.friendid);

  if (req.body.status === 1 && index < 0) {
    friend.createNewFriend(req.body);
    // console.log("Đã thêm vào");
    // console.log(UserFriend);
    res.send("1");
  } else if (req.body.status === 0 && index >= 0) {
    friend.cancelAddRequest(req.body.userid, req.body.friendid)
    // console.log("Đã hủy");
    // console.log(UserFriend);
    res.send("0");
  }
}

module.exports = ReceiveFistname;
