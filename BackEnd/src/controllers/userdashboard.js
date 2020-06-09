import user from "../APIs/user";


let ReceiveFistname = (req, res, next) => {
  res.send(user.nowInforProfile());
}
module.exports = ReceiveFistname;
