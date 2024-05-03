import { user_Model } from "../models/usermodel.js";
let newuser
export let current_User = []
let addNew_user = async (username, email, password, pf_img, pf_ext) => {
    let user = new user_Model({
        username: username,
        email: email,
        password: password,
        profile_img: pf_img,
        profile_ext: pf_ext,
        cover_img: pf_img,
        cover_ext: pf_ext,

        my_Posts: [],
        saved: [],
        liked_Posts: [],
        Friends: [],
        requests: [],
        story: [],
        messages: [],
    })

    newuser = await user.save()
    // console.log(newuser);

}

//signup

export const postSignup = async (req, res) => {

    let profile = req.file
    // console.log(req.body);
    let user = await user_Model.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).lean({}).then((data) => {
        return data
    })
    if (user == undefined) {
        await addNew_user(req.body.username, req.body.email, req.body.password, profile.buffer, profile.mimetype)
        let new_user = await user_Model.findById(newuser._id).lean({}).then((data) => {
            return data
        })

        console.log(newuser);
        let data = { status: "success", user: new_user }

        res.json(data)
    } else {
        if (user.username == req.body.username) {
            res.json({ error: "username is already taken" })
        } else {
            res.json({ error: "email is already taken" })
        }

    }


}

//login
export const postLogin = async (req, res) => {

    const new_user = req.body
    console.log("new_user");
    let existing_user = await user_Model.findOne({ email: new_user.email }).lean({}).then((data) => {
        return data
    })
    if (existing_user == undefined) {
        res.json("invalid email")
    }
    else if (existing_user.password == new_user.password && existing_user.username == new_user.username) {

        // console.log(current_User);
        res.json({ status: "success", user: existing_user })

    }
    else {
        if (existing_user.username != new_user.username) {
            res.json({ error: "invalid username" })
        } else {
            res.json({ error: "invalid password" })
        }
    }
    // res.json("invalid email")
}

export const getUser = async (req, res) => {
    const userid = req.params.userid
    console.log(userid, "uset");
    let user = await user_Model.findById(userid).populate([{
        path: "requests",
        model: "users",
    }, {
        path: "story",
        model: "stories",
    }, {
        path: "friends",
        model: "users",
        populate: {
            path: "story",
            model: "stories",
        }
    }, {
        path: "my_Posts",
        model: "posts",
        populate: {
            path: "user",
            model: "users",
        }
    }, {
        path: "saved",
        model: "posts",
        populate: {
            path: "user",
            model: "users",
        }
    }]).lean({}).then((data) => {
        console.log("hii");
        return data
    })

    for (let i = 0; i < user.my_Posts.length; i++) {
        user.my_Posts[i].comments = user.my_Posts[i].comments.length
        user.my_Posts[i].liked_Users = user.my_Posts[i].liked_Users.length
    }
    for (let i = 0; i < user.saved.length; i++) {
        user.saved[i].comments = user.saved[i].comments.length
        user.saved[i].liked_Users = user.saved[i].liked_Users.length
    }


    res.json(user)


}


//get all messages
export const getMessages = async (req, res) => {
    const userid = req.params.userid
    let user = await user_Model.findById(userid).populate([
        {
            path: "friends",
            model: "users",
           
        }, {
            path: "messages",
            model: "messages",
        },
    ]).lean({}).then((data) => {
        console.log("hii");
        return data
    })
    res.json(user)
}



//friend requests

export const postrequest = async (req, res) => {
    const id = req.params.id
    const userid = req.params.userid
    let friendRequest = await user_Model.findOne({ _id: id, requests:userid }).lean({}).then((data) => {
        return data
    })
    let friend = await user_Model.findOne({ _id: userid, friends:id }).lean({}).then((data) => {
        return data
    })
    if (friendRequest != undefined) {
        await user_Model.findByIdAndUpdate(id, { $pull: { requests: userid } })
        console.log("removed");
    }
    else if (friend != undefined) {
        console.log("already friend");
    }
    else {
        await user_Model.findByIdAndUpdate(id, { $push: { requests: userid } })
        console.log("added");
    }
    res.json("request saved")
}

//accept request
export const Accept_request = async (req, res) => {
    const id = req.params.id
    const userid = req.params.userid
    await user_Model.findByIdAndUpdate(id, { $push: { friends: userid } })
    console.log("added");
    await user_Model.findByIdAndUpdate(userid, { $pull: { requests: id } })
    res.json("request accepted")
}

//reject request
export const Reject_request = async (req, res) => {
    const userid = req.params.userid
    const id = req.params.id
    await user_Model.findByIdAndUpdate(userid, { $pull: { requests: id } })
    console.log("removed");
    res.json("request denied")
}

//unfollow
export const Unfollow = async (req, res) => {
    const userid = req.params.userid
    const id = req.params.id
    await user_Model.findByIdAndUpdate(userid, { $pull: { friends: id } })
    console.log("removed");
    res.json("Unfollow")
}

//update profile
export const postUpadate = async (req, res) => {
    const id = req.params.id
    let profile = req.file
    let status=req.body.update_status
    let name=req.body.update_name
     console.log(req.body);
    
    if (status!= "False") {
await user_Model.findByIdAndUpdate(id,{profile_img:profile.buffer,
    profile_ext:profile.mimetype})

    }

    await user_Model.findByIdAndUpdate(id,{username:name})
res.json("added name pic")

}