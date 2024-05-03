import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,FormsModule,DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  constructor(private Service: SystemService, private userService: UserService,
    private apiservice: ApiService, private router: Router) { }
  ngOnInit(): void {
    //get user details about friends story requests

    this.userService.user_profile.subscribe((user) => {
      this.userStory = user.story
      this.friends = user.friends
      this.requests = user.requests
      console.log("friends=", this.friends);
      this.user_liked_posts=user.liked_Posts
      this.user_saved_posts=user.saved
      console.log("liked posts of user=",this.user_liked_posts);
    })
    this.Service.notify.subscribe((show) => {
      this.show = show
    })
    //get userid
    this.userService.user_id.subscribe((user) => {
      this.userid = user
    })
//get friendsid
this.userService.friend_id.subscribe((friendsid)=>{
  this.friends_id=friendsid
})
//get saved posts
this.userService.saved_post_id.subscribe((savedid)=>{
  this.user_saved_id=savedid
})
    //get user img
    this.userService.user_profile_img.subscribe((user_img) => {
      this.userImg = user_img
    })
    //get all posts
    this.userService.allPosts.subscribe((posts) => {
      this.allPosts = posts
    })
    this.apiservice.getposts().subscribe((data) => {
      // this.allPosts=data
      if (data=="No posts") {
        console.log(data);
      }
     else{
      this.userService.updateallPosts(data)
      // console.log(this.allPosts);
      this.getFriendsid()
     }
    })

    

  }
  //...................................
  userid: any
  userStory: any
  friends: any
  friends_id: any[]=[]
  user_saved_id:any[]=[]
  requests: any
  userImg: any
  allPosts: any
  requestedPost: any

  formdata = new FormData()
  newStory: any
  newPost_content = ""

  newPost: any
  user_liked_posts:any
  user_saved_posts:any
  //..................................

  
// .........
getFriendsid(){
  let friendsid:any[]=[]
  this.friends.forEach((friend:any) => {
    friendsid.push(friend._id)
  });
 this.userService.updatefriendsid(friendsid)

 let savedid:any[]=[]
 this.user_saved_posts.forEach((post:any) => {
    savedid.push(post._id)
  });
 this.userService.updatesaved_postid(savedid)



  
}



  storyContent(event: any) {
    this.formdata.delete("story")
    const file = event.target.files[0]
    this.formdata.append("story", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let content: any = reader.result
      this.newStory = content


    }
  }

  postContent(event: any) {
    this.formdata.delete("post")
    const file = event.target.files[0]
    this.formdata.append("post", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let content: any = reader.result
      this.newPost = content
    }

  }

  storyUpload() {

    if (this.newStory != undefined) {
      this.apiservice.postStory(this.formdata, this.userid).subscribe((data) => {
        console.log(data);
        this.Service.updatenotify(!this.show)
        setTimeout(() => { this.Service.updatenotify(!this.show) }, 2000)
        this.Service.updatepopUpMessage("Story Uploaded")
      })


    }
    console.log("storyclicked");

  }

  postUpload() {

    this.formdata.delete("content")
    this.formdata.append("content", this.newPost_content)
    this.apiservice.postCreation(this.formdata, this.userid).subscribe((data) => {
      console.log(data);
      this.Service.updatenotify(!this.show)
      setTimeout(() => { this.Service.updatenotify(!this.show) }, 2000)
      this.Service.updatepopUpMessage("Post Uploaded")
    })

  }


  //...................................
  more_options = false
  show: any
  moreoptions = "see-options"
  storyviewActive = "storyviewActive"
  allstory: any[] = []
  storyShow = false
  startVideo = false
  storyindex = 0
  selected_story: string | number = 0
  storyView(index: any) {
    console.log(index);

    if (index == "user") {
      if (this.userStory.length != 0) {
        this.allstory = this.userStory
        this.storyShow = true
        this.startVideo = true
        console.log("clicked");
      } else {
        this.storyShow = false
        this.startVideo = false
      }

    } else {
      this.allstory = this.friends[index].story
      this.storyShow = true
      this.startVideo = true
      this.selected_story = index
      console.log("clicked");
    }

    if (this.allstory[this.storyindex].story_type != "video/mp4") {
      setTimeout(() => { this.videoEnded() }, 6000)
    }
  }


  newStoryView() {
    if (this.allstory[this.storyindex].story_type != "video/mp4") {
      setTimeout(() => { this.videoEnded() }, 6000)
    }

  }
  videoEnded() {
    if (this.allstory.length - 1 > this.storyindex) {
      this.storyindex += 1
      this.newStoryView()
    } else {
      this.allstory = []
      this.storyShow = false
      this.startVideo = false
      this.storyindex = 0
      // if (this.selected_story == '') {
      //   this.storyView(0)
      // } else {
      //   let i = this.selected_story as number + 1
      //   this.storyView(i)
      // }

    }
  }


  //more options
  option_id=0
  seeoptions(id:number) {
    this.option_id=id
    this.more_options = !this.more_options
  }
  //follow request
  follow(id: any) {
    this.Service.updatenotify(!this.show)
    setTimeout(() => { this.Service.updatenotify(!this.show) }, 2000)
    this.apiservice.postrequest(id, this.userid).subscribe((data) => {
      console.log(data);

    })
    console.log("user=", id);
    this.Service.updatepopUpMessage("send request")
  }

  addLike(id: any) {
    this.apiservice.postLike(id, this.userid).subscribe((data) => {
      console.log(data);

    })
  }
  postSaved(id: any) {
    this.apiservice.postsave(id, this.userid).subscribe((data) => {
      console.log(data);

    })
  }

  //comment box
  commentsView = false
  addComment(id: any) {

    this.apiservice.viewComments(id).subscribe((data) => {
      this.requestedPost = data
      this.commentsView = true
    })


  }
  comments() {
    this.commentsView = false
  }

  uploadingComment = ''
  addComments(id: any) {
    let addcmnt = { Comment: this.uploadingComment }
    this.apiservice.postComment(id, addcmnt, this.userid).subscribe((data) => {
      console.log(data);
    })

    console.log("cmnt=", id, this.uploadingComment);

  }
  addReplays(id: any, rply: any) {
    let addrply = { Replay: rply }
    this.apiservice.postReplay(id, addrply, this.userid).subscribe((data) => {
      console.log(data);
    })
    //window.location.reload()
    console.log("rply=", id, rply);

  }

  deleteComment(cid: any) {
    console.log(this.requestedPost._id);
    this.apiservice.getdeletecmnt(this.requestedPost._id, cid, this.userid).subscribe((data) => {
      console.log(data);
    })
    //window.location.reload()
    console.log(cid);


  }

  deleteReplay(cid: any, rid: any) {
    this.apiservice.getdeleterply(cid, rid, this.userid).subscribe((data) => {
      console.log(data);
    })
    //window.location.reload() 
    console.log(cid, rid);


  }

  //request handling
  Accept(id: any) {
    console.log(id);
    this.apiservice.acceptRequest(id, this.userid).subscribe((data) => {
      console.log("request", data);

    })

  }

  reject(id: any) {
    console.log(id);
    this.apiservice.rejectRequest(id, this.userid).subscribe((data) => {
      console.log("request=", data);

    })
  }

}

