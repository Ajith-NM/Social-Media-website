
import mongoose, { Schema } from "mongoose";
const post_Schema=new mongoose.Schema({
    text:{type:String},
    post_image:{type:Buffer},
    post_type:{type:String},
    date:{type:Date,default:Date.now},
    comments:[{type:Schema.Types.ObjectId,ref:"comments"}],
    liked_Users:[{type:Schema.Types.ObjectId,ref:"users"}],
    user:{type:Schema.Types.ObjectId,ref:"users"},

})
export const post_Model=mongoose.model("posts",post_Schema)