import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private client: HttpClient) { }
 

  // http connections
  Base_url: string = "http://localhost:4201/"



  //for signup
  postSignup(data: any) {
    return this.client.post(`${this.Base_url}signup`, data)
  }

  //for login
  postLogin(data: any) {
    return this.client.post(`${this.Base_url}login`, data)
  }

  //get all posts
  getposts() {
    return this.client.get(`${this.Base_url}posts`)
  }

  //for creating a post
  postCreation(data: any,userid:any) {
    return this.client.post(`${this.Base_url}creation/${userid}`, data)
  }

  //update
  postUpdate(data: any,userid:any) {
    return this.client.post(`${this.Base_url}update/${userid}`, data)
  }

  //for postcomments
  viewComments(post_id: any) {
    return this.client.get(`${this.Base_url}post/comments/${post_id}`)
  }
  //post comment
  postComment(p_id: any, cmnt: any,userid:any) {
    return this.client.post(`${this.Base_url}comments/${p_id}/${userid}`, cmnt)
  }
  //post replay
  postReplay(c_id: any, rply: any,userid:any) {
    return this.client.post(`${this.Base_url}replay/${c_id}/${userid}`, rply)
  }
  //post like
  postLike(data: any,userid:any) {
    return this.client.get(`${this.Base_url}postlike/${data}/${userid}`)
  }
  //delete comment
  getdeletecmnt(pid: any, cid: any,userid:any) {
    return this.client.get(`${this.Base_url}deletecomment/${pid}/${cid}/${userid}`)
  }

  //delete replay
  getdeleterply(id1: any, id2: any,userid:any) {
    return this.client.get(`${this.Base_url}deletereplay/${id1}/${id2}/${userid}`)
  }
  //post save
  postsave(data: any,userid:any) {
    return this.client.get(`${this.Base_url}postsave/${data}/${userid}`)
  }
  //story upload
  postStory(data: any,userid:any) {
    return this.client.post(`${this.Base_url}story/${userid}`, data)
  }

  //friend request
  postrequest(data: any,userid:any) {
    return this.client.get(`${this.Base_url}friendrequests/${data}/${userid}`)
  }
  //accept request
  acceptRequest(data: any,userid:any) {
    return this.client.get(`${this.Base_url}acceptrequest/${data}/${userid}`)
  }
  //reject request
  rejectRequest(data: any,userid:any) {
    return this.client.get(`${this.Base_url}rejectrequest/${data}/${userid}`)
  }
//unfollow
  unfollow(data: any,userid:any) {
    return this.client.get(`${this.Base_url}unfollow/${data}/${userid}`)
  }
  //get user details
  getUser(userid:any){
    return this.client.get(`${this.Base_url}userdetails/${userid}`)
  }

  //get user friends and messages
  getMessage(userid:any){
    return this.client.get(`${this.Base_url}messages/${userid}`)
  }
//save messages
sendMessage(userid:any,receiverid:any,data:any){
  return this.client.post(`${this.Base_url}savemessages/${userid}/${receiverid}`, data)
}
}
