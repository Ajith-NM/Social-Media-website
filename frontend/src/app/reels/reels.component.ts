import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { SystemService } from '../system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reels',
  standalone: true,
  imports: [DatePipe,FormsModule],
  templateUrl: './reels.component.html',
  styleUrl: './reels.component.css'
})
export class ReelsComponent implements OnInit {

  constructor(private userService: UserService, private apiservice: ApiService,
    private Service: SystemService, private router: Router, private Active: ActivatedRoute) { }

  async ngOnInit() {
    //get friendsid
    this.userService.friend_id.subscribe((friendsid) => {
      this.friends_id = friendsid
    })
    //liked posts
    this.userService.user_profile.subscribe((user) => {
      this.user_liked_posts=user.liked_Posts
    })
    //saved post id
    this.userService.saved_post_id.subscribe((savedid)=>{
      this.user_saved_id=savedid
    })

    this.posts = await this.Active.snapshot.params['posts']
    console.log(this.posts);

    if (this.posts == "saved") {
      this.userService.user_profile.subscribe((user) => {
        this.allPosts = user.saved
        console.log("savedposts=", user);
      })
    } else {

      this.userService.allPosts.subscribe((posts) => {
        this.allPosts = posts
      })

      this.apiservice.getposts().subscribe((data) => {
        // this.allPosts=data
        this.userService.updateallPosts(data)
        // console.log(this.allPosts);

      })

    }

    this.userService.user_id.subscribe((user) => {
      this.userid = user
    })
    this.Service.notify.subscribe((show) => {
      this.show = show
    })
    this.userService.user_profile.subscribe((user) => {
      this.friends = user.friends
    })
  }
  //.........
  friends_id: any[] = []
  user_saved_id:any[]=[]
  posts = ''
  userid: any
  allPosts: any
  requestedPost: any
  friends: any
  user_liked_posts:any


  //..........
  more_options = false
  moreoptions = "see-options"
  seeoptions() {
    this.more_options = !this.more_options
  }
  show: any
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
    window.location.reload()
    console.log("cmnt=", id, this.uploadingComment);

  }
  addReplays(id: any, rply: any) {
    let addrply = { Replay: rply }
    this.apiservice.postReplay(id, addrply, this.userid).subscribe((data) => {
      console.log(data);
    })
    window.location.reload()
    console.log("rply=", id, rply);

  }

  deleteComment(cid: any) {
    console.log(this.requestedPost._id);
    this.apiservice.getdeletecmnt(this.requestedPost._id, cid, this.userid).subscribe((data) => {
      console.log(data);
    })
    window.location.reload()
    console.log(cid);


  }

  deleteReplay(cid: any, rid: any) {
    this.apiservice.getdeleterply(cid, rid, this.userid).subscribe((data) => {
      console.log(data);
    })
    window.location.reload()
    console.log(cid, rid);


  }
}

