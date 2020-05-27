import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  sender: {
    id: String,
    username: String,
    avartar: String
  },
  receiver: {
    id: String,
    username: String,
    avartar: String
  },
  text: String,
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("message", MessageSchema);