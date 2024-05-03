import mongoose, { Schema } from "mongoose";
const user_Schema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    profile_img:{type:Buffer},
    profile_ext:{type:String},
    cover_img:{type:Buffer},
    cover_ext:{type:String},

    my_Posts:[{type:Schema.Types.ObjectId,ref:"posts"}],
    saved:[{type:Schema.Types.ObjectId,ref:"posts"}],
    liked_Posts:[{type:Schema.Types.ObjectId,ref:"posts"}],
    friends:[{type:Schema.Types.ObjectId,ref:"users"}],
    requests:[{type:Schema.Types.ObjectId,ref:"users"}],
    story:[{type:Schema.Types.ObjectId,ref:"stories"}],
    messages:[{type:Schema.Types.ObjectId,ref:"messages"}]

})
export const user_Model=mongoose.model("users",user_Schema)