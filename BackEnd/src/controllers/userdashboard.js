import user from "../APIs/user";


let ReceiveFistname = (req, res, next) => {
  console.log(req.body);
  res.send(user.returnImediateUserInfor());
}
module.exports = ReceiveFistname;
