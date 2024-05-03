import mongoose, { Schema } from "mongoose";
const message_Schema = new mongoose.Schema({
    from: { type: String },
    to: { type: String },
    date: { type: Date, default: Date.now },
    message: { type: String },

})
export const message_Model = mongoose.model("messages", message_Schema)