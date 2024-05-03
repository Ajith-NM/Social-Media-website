import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor() { }
 

  //user details(all)
  private user = new BehaviorSubject<any>('user')
  public user_profile = this.user.asObservable()
  updateuser(usr: any) {
    this.user.next(usr)
  }

  //user profile img
  private user_img = new BehaviorSubject<any>("")
  public user_profile_img = this.user_img.asObservable()
  updateuserImg(usr: any) {
    this.user_img.next(usr)
  }

  //all posts
  private posts = new BehaviorSubject<any>([])
  public allPosts = this.posts.asObservable()
  updateallPosts(usr: any) {
    this.posts.next(usr)
  }

//user object id
  private userid = new BehaviorSubject<any>("")
  public user_id = this.userid.asObservable()
  updateuserid(user: any) {
    this.userid.next(user)
  }

  private friendsid = new BehaviorSubject<any>("")
  public friend_id = this.friendsid.asObservable()
  updatefriendsid(id: any) {
    this.friendsid.next(id)
  }

  private savedid = new BehaviorSubject<any>("")
  public saved_post_id = this.savedid.asObservable()
  updatesaved_postid(id: any) {
    this.savedid.next(id)
  }
}
