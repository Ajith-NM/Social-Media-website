import { story_Model } from "../models/storymodel.js";
import { message_Model } from "../models/messagemodel.js";
import { post_Model } from "../models/postmodel.js";
import { user_Model } from "../models/usermodel.js";

let newly_created_story
let newly_created_message
let addNew_story = async (story_img, story_type, user) => {
    let newStory = new story_Model({
        story_image: story_img,
        story_type: story_type,
        user: user,
    })
    newly_created_story = await newStory.save()
}

let addNew_message = async (from, to, msg) => {
let newMessage=new message_Model({
    from:from,
    to:to,
    message:msg
})
newly_created_message=await newMessage.save()
}

//add like
export const postLike = async (req, res) => {

    const id = req.params.id
    const userid = req.params.userid
    let post_likes = await post_Model.findOne({ _id: id, liked_Users: userid }).lean({}).then((data) => {

        return data
    })
    if (post_likes != undefined) {
        await post_Model.findByIdAndUpdate(id, { $pull: { liked_Users: userid } })
        await user_Model.findByIdAndUpdate(userid,{ $pull: { liked_Posts: id } })
        console.log("removed");
    } else {
        await post_Model.findByIdAndUpdate(id, { $push: { liked_Users: userid } })
        await user_Model.findByIdAndUpdate(userid,{ $push: { liked_Posts: id } })
        console.log("added");
    }
    res.json("like added")

}

//saved post
export const postSave = async (req, res) => {
    const id = req.params.id
    const userid = req.params.userid
    let savedPosts = await user_Model.findOne({ _id: userid, saved: id }).lean({}).then((data) => {
        return data
    })
    if (savedPosts != undefined) {
        await user_Model.findByIdAndUpdate(userid, { $pull: { saved: id } })
        console.log("removed");
    }
    else {
        await user_Model.findByIdAndUpdate(userid, { $push: { saved: id } })
        console.log("added");
    }
    res.json("post saved")
}

//story upload
export const postStory = async (req, res) => {
    console.log("hlo");
    let story = req.file
    const userid = req.params.userid
    console.log(story, userid);
    await addNew_story(story.buffer, story.mimetype, userid)
    console.log(newly_created_story);
    await user_Model.findByIdAndUpdate(userid, { $push: { story: newly_created_story._id } })
    res.json("story uploaded")


}

export const postMessage=async(req,res)=>{
    console.log("new message");
    const userid = req.params.userid
    const receiverid = req.params.rid
    let newmessage=req.body
    console.log("body=",newmessage);
await addNew_message(newmessage.from,newmessage.to,newmessage.message)
await user_Model.findByIdAndUpdate(userid, { $push: { messages: newly_created_message._id} })
await user_Model.findByIdAndUpdate(receiverid, { $push: { messages:newly_created_message._id } })
res.json("message uploaded")
}
