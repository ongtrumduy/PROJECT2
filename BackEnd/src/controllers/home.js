import user from "../APIs/user";


let ReceiveInfor = (req, res, next) => {
  res.send(user.nowInforUnknow(req.body.userid));
}

module.exports = ReceiveInfor;
