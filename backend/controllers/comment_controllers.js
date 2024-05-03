import { post_Model } from "../models/postmodel.js";
import { comment_Model } from "../models/commentmodel.js";

import { replay_Model } from "../models/replaymodel.js";
// functions for adding comments and replays
//comments
let New_Comment
let addComments = async (cmnt, user) => {
    let newComment = new comment_Model({
        comment: cmnt,
        comment_user: user,
        replays: [],
    })
    New_Comment = await newComment.save()
}
//replays
let New_Replay
let addReplays = async (replay, user) => {
    let newReplay = new replay_Model({
        replay: replay,
        replay_user: user,
    })
    New_Replay = await newReplay.save()
}

//add comment

export const postComment = async (req, res) => {

    const userid=req.params.userid
        const comment = req.body
        const postid = req.params.id
        console.log("comment1",comment.Comment)
        
        console.log("id", postid);
         await addComments(comment.Comment, userid)
         await post_Model.findByIdAndUpdate(postid, { $push: { comments: New_Comment._id } })
        res.json("comment added")
   
   
}

//add replay
export const postReplay = async (req, res) => {
   
        const replay = req.body
        const cid = req.params.id
        const userid=req.params.userid
        console.log("commentreplay1", replay.Replay);
       

        console.log("id", cid);
        await addReplays(replay.Replay, userid)
         await comment_Model.findByIdAndUpdate(cid, { $push: { replays: New_Replay._id } })
        res.json("replay added")
   
}

// delete replay
export const getdeleteReplay = async (req, res) => {
   
        const id1 = req.params.cid
        const id2 = req.params.rid
        const userid=req.params.userid
        console.log(id1, id2);
        let comment = await comment_Model.findOne({ _id: id1, comment_user: userid }).lean({}).then((data) => {
            return data
        })
        if (comment != undefined) {
            await comment_Model.findByIdAndUpdate(id1, { $pull: { replays: id2 } })
            await replay_Model.findByIdAndDelete(id2)
        } else {
            let replay = await replay_Model.findOne({ _id: id2, replay_user: userid }).lean({}).then((data) => {
                return data
            })
            if (replay != undefined) {
                await comment_Model.findByIdAndUpdate(id1, { $pull: { replays: id2 } })
                await replay_Model.findByIdAndDelete(id2)
            }
        }
        res.json("replay deleted")
    
}

//delete comment
export const getdeleteComment = async (req, res) => {
    
        const id1 = req.params.pid
        const id2 = req.params.cid
        const userid=req.params.userid
        console.log(id1, id2);
        let post = await post_Model.findOne({ _id: id1, user: userid }).lean({}).then((data) => {
            return data
        })
        if (post != undefined) {
            await post_Model.findByIdAndUpdate(id1, { $pull: { comments: id2 } })
            let comment = await comment_Model.findById(id2).lean({}).then((data) => {
                return data
            })
            comment.replays.forEach(async (id) => {
                await replay_Model.findByIdAndDelete(id)
            })
            await comment_Model.findByIdAndDelete(id2)
        } else {
            let comment = await comment_Model.findOne({ _id: id2, comment_user: userid }).lean({}).then((data) => {
                return data
            })
            if (comment != undefined) {
                await post_Model.findByIdAndUpdate(id1, { $pull: { comments: id2 } })
                let comment = await comment_Model.findById(id2).lean({}).then((data) => {
                    return data
                })
                comment.replays.forEach(async (id) => {
                    await replay_Model.findByIdAndDelete(id)
                })
                await comment_Model.findByIdAndDelete(id2)
            }
        }
        res.json("comment deleted")
   
}