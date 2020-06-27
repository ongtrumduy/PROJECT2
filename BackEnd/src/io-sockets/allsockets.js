import addfriendSocket from "./addfriend";
import adduserSocket from "./adduserlist";
import chatlistSocket from "./chatfriendlist";
import chatmineSocket from "./chatminefriend";
import chattextSocket from "./chatconversation";
import friendonlineSocket from "./friendonline";
import waituserSocket from "./waituserlist";
import friendlistSocket from "./userfriendlist";
import adminstatisticSocket from "./adminstatistic";
import totaluserSocket from "./totaluser";
import buttonnextSocket from "./buttonnext";
import buttonpreSocket from "./buttonpre";
import indexfriendSocket from "./updateindexfriend";
import changeinforSocket from "./changeinfor";
import adminseeonlineSocket from "./adminseefriendonline";



let AllSockets = (io) => {
  //============================Socket======================================

  // --------------------------AddFriend--------------------------------------
  addfriendSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AddUserList--------------------------------------
  adduserSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------ChatListFriend--------------------------------------
  // chatlistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------ChatMineFriend--------------------------------------
  // chatmineSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------ChatMineFriend--------------------------------------
  chattextSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------FriendOnline--------------------------------------
  friendonlineSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------WaitUserList--------------------------------------
  waituserSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UserFriendList--------------------------------------
  friendlistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AdminStatistic--------------------------------------
  adminstatisticSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AdminStatistic--------------------------------------
  adminstatisticSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------TotalUserList--------------------------------------
  totaluserSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------NextButon--------------------------------------
  buttonnextSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------PreButon--------------------------------------
  buttonpreSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateIndexFriend--------------------------------------
  indexfriendSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------ChangeInfor--------------------------------------
  changeinforSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AdminSeeOnline--------------------------------------
  adminseeonlineSocket(io);
  //--------------------------------------------------------------------------

  //=========================================================================

}

module.exports = AllSockets;