import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SystemService } from '../system.service';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe,RouterLink,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private userService: UserService, private apiservice: ApiService,private Service:SystemService) { }
  ngOnInit(): void {
    this.userService.user_profile.subscribe((user)=>{
      this.userProfile=user
      this.savedPost=user.saved
      this.userFriends=user.friends
this.userPosts=user.my_Posts

this.updateprof()
  })
  this.userService.user_id.subscribe((user)=>{
    this.userid=user
  })
  
  this.apiservice.getUser(this.userid).subscribe((data: any) => {
    if (data != "failed") {
      this.userService.updateuser(data)

    }else{
      console.log("no user");
      
    }
  })
  //get friendsid
  this.userService.friend_id.subscribe((friendsid)=>{
    this.friends_id=friendsid
  })
  }

  //..........................
  userid:any
userProfile:any
savedPost:any
userFriends:any
userPosts:any
friends_id: any[]=[]
requestedPost:any
  
  //..........................
  more_options = false
  moreoptions = "see-options"
  seeoptions() {
    this.more_options = !this.more_options

  }

  arr = [1, 3]
  align = "align"
  showpost = "showpost"
  post = false
  friends = true
  saved=true
  edit = true

  delete_friend(id:any){
console.log(id);
this.apiservice.unfollow(id,this.userid).subscribe((data:any)=>{
  console.log(data);
  
})
  }
  show_post() {
    this.post = false
    this.friends = true
    this.edit = true
    this.saved=true
  }
  show_friends() {
    this.friends = !this.friends
    this.edit = true
   this. saved=true
    if (this.friends && this.edit&&this.saved) {
      this.post = false
    }
    else {
      this.post = true
    }
  }
  show_edit() {
    this.edit = !this.edit
    this.friends = true
    this. saved=true
    if (this.friends && this.edit&&this.saved) {
      this.post = false
    }
    else {
      this.post = true
    }
  }
  show_saved(){
    this.saved = !this.saved
    this.friends = true
    this.edit = true
    if (this.friends && this.edit&&this.saved) {
      this.post = false
    }
    else {
      this.post = true
    }
  }




 
  show:any
  follow(id:any){
    this.Service.updatenotify(!this.show)
    setTimeout(()=>{this.Service.updatenotify(!this.show)},2000)
  this.apiservice.postrequest(id,this.userid).subscribe((data)=>{
    console.log(data);
    
  })
  console.log("user=",id);
  this.Service.updatepopUpMessage("send request")
  }
  
  addLike(id:any){
  this.apiservice.postLike(id,this.userid).subscribe((data)=>{
    console.log(data);
    
  })
  }
  postSaved(id:any){
  this.apiservice.postsave(id,this.userid).subscribe((data)=>{
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
comments(){
  this.commentsView = false
}

uploadingComment=''
addComments(id:any){
  let addcmnt={Comment:this.uploadingComment}
this.apiservice.postComment(id,addcmnt,this.userid).subscribe((data)=>{
console.log(data); 
})
window.location.reload()
console.log("cmnt=",id,this.uploadingComment);
  
}
addReplays(id:any,rply:any){
let addrply={Replay:rply}
this.apiservice.postReplay(id,addrply,this.userid).subscribe((data)=>{
  console.log(data); 
 })
window.location.reload()
console.log("rply=",id,rply);

}

deleteComment(cid:any){
console.log(this.requestedPost._id);
this.apiservice.getdeletecmnt(this.requestedPost._id,cid,this.userid).subscribe((data)=>{
   console.log(data); 
  })
window.location.reload()
console.log(cid);


}

deleteReplay(cid:any,rid:any){
this.apiservice.getdeleterply(cid,rid,this.userid).subscribe((data)=>{
     console.log(data); 
  })
window.location.reload() 
console.log(cid,rid);


}

//........user profile updatess....................

profile_pic:any
user_name:any
formdata = new FormData()

updateprof(){
this.profile_pic=`data:${this.userProfile.profile_ext};base64,${this.userProfile.profile_img}`
this.user_name=this.userProfile.username
}


uploadpic(event: any) {
  this.formdata.delete("update_pic")
  const file = event.target.files[0]
  this.formdata.append("update_pic", file)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    let image1: any = reader.result
    this.profile_pic = image1
  }
}
update_profile(){
  this.formdata.delete("update_name")
  this.formdata.delete("update_status")
  if (this.user_name=="") {
    this.user_name=this.userProfile.username
  }
  if (this.profile_pic==`data:${this.userProfile.cover_ext};base64,${this.userProfile.cover_img}`) {
    this.formdata.append("update_status","False")
  }


this.formdata.append("update_name",this.user_name)

console.log("jihtfrd");

this.apiservice.postUpdate(this.formdata,this.userid).subscribe((data)=>{
  console.log(data);
  
})
}

}

