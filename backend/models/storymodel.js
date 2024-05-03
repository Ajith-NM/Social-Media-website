import mongoose, { Schema } from "mongoose";
const story_Schema=new mongoose.Schema({
    story_image:{type:Buffer},
    story_type:{type:String},
    date:{type:Date,default:Date.now},
    user:{type:Schema.Types.ObjectId,ref:"users"},

})
export const story_Model=mongoose.model("stories",story_Schema)