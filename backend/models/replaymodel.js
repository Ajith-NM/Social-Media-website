import mongoose, { Schema } from "mongoose";
const replay_Schema=new mongoose.Schema({
    replay:{type:String},
    replay_user:{type:Schema.Types.ObjectId,ref:"users"},
    date:{type:Date,default:Date.now}
})
export const replay_Model=mongoose.model("replays",replay_Schema)