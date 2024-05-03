import  express from "express";
const user_router=express.Router()
import mongoose from "mongoose";

import multer from "multer";
const storage=multer.memoryStorage()
const upload=multer({storage:storage})

import { postLogin,postSignup,postrequest,Accept_request,Reject_request,getUser,getMessages,postUpadate,Unfollow } from "../controllers/user_controllers.js";
import { getPosts,postCreation,getpostComments } from "../controllers/post_controllers.js";
import { postComment,postReplay,getdeleteComment,getdeleteReplay } from "../controllers/comment_controllers.js";
import { postLike,postStory,postSave,postMessage } from "../controllers/other_controllers.js";
// user login/signup update user
user_router.post("/signup",upload.single("profile"),postSignup)
user_router.post("/login",postLogin)
user_router.get("/userdetails/:userid",getUser)
user_router.post("/update/:id",upload.single("update_pic"),postUpadate)

//user accessing posts
user_router.get("/posts",getPosts)
user_router.post("/creation/:userid",upload.single("post"),postCreation)
user_router.get("/post/comments/:id",getpostComments)

//user comments replays 
user_router.post("/comments/:id/:userid",postComment)
user_router.post("/replay/:id/:userid",postReplay)
user_router.get("/deletereplay/:cid/:rid/:userid",getdeleteReplay)
user_router.get("/deletecomment/:pid/:cid/:userid",getdeleteComment)

//friends,requests,like,save,story
user_router.post("/story/:userid",upload.single("story"),postStory)
user_router.get("/postsave/:id/:userid",postSave)
user_router.get("/postlike/:id/:userid",postLike)
user_router.get("/friendrequests/:id/:userid",postrequest)
user_router.get("/acceptrequest/:id/:userid",Accept_request)
user_router.get("/rejectrequest/:id/:userid",Reject_request)
user_router.get("/unfollow/:id/:userid",Unfollow)
//messages
user_router.get("/messages/:userid",getMessages)
user_router.post("/savemessages/:userid/:rid",postMessage)

export default user_router