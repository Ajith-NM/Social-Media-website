import { post_Model } from "../models/postmodel.js";
import { user_Model } from "../models/usermodel.js";


let newly_created_post
let addNew_Post = async (content, post_img, post_ext, user) => {
    let newPost = new post_Model({
        text: content,
        post_image: post_img,
        post_type: post_ext,
        comments: [],
        liked_Users: [],
        user: user,
    })
    newly_created_post = await newPost.save()
}


//post creation
export const postCreation = async (req, res) => {
    const userid=req.params.userid
   

        let image = req.file   
        let new_post = req.body
         console.log(new_post);
        await addNew_Post(new_post.content, image.buffer, image.mimetype, userid)
        await user_Model.findByIdAndUpdate(userid, { $push: { my_Posts: newly_created_post._id } })
        res.json("successfull")

  
    // res.json("successfull")
}

//get all posts
export const getPosts = async (req, res) => {
    const userid=req.params.userid
    let allPosts = await post_Model.find().populate('user').lean({}).then((data) => {
        return data
    })
    if (allPosts.length == 0) {
        res.json("No posts")
    } else {
        for (let i = 0; i < allPosts.length; i++) {
            allPosts[i].comments = allPosts[i].comments.length
          
            allPosts[i].liked_Users = allPosts[i].liked_Users.length
            

        }
        console.log("allPosts");

        res.json(allPosts)
    }
    
}


//fetching user requested post for comments
export const getpostComments = async (req, res) => {

    const id = req.params.id
    let post = await post_Model.findById(id).populate([{
        path: "comments",
        model: "comments",
        populate: [{
            path: "replays",
            model: "replays",
            populate: {
                path: "replay_user",
                model: "users",
            }
        },
        {
            path: "comment_user",
            model: "users"
        }]
    }, {
        path: "user",
        model: "users"
    }]).lean({}).then((data) => {
        // console.log("requested post=", data.comments);
        return data
    })

     res.json(post)
}
