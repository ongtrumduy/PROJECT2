import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String
});

module.exports = mongoose.model("contact", ContactSchema);