import mongoose from "mongoose";

let Schema = mongoose.Schema;

let FriendSchema = new Schema({
  userId: String,
  contactId: String,
  online: { type: Boolean, default: false }
});

module.exports = mongoose.model("contact", FriendSchema);