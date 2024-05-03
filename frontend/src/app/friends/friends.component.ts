import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit{
  constructor(private userService: UserService, private apiservice: ApiService) { }
  ngOnInit(): void {
    this.userService.user_profile.subscribe((user)=>{
     
      this.userRequests=user.requests

  })
  this.userService.user_id.subscribe((user)=>{
    this.userid=user
  })
  }

    //..........................
userRequests:any
userid:any
  //..........................
  array=[1,3]
  align="align"

  Accept(id:any){
console.log(id);
this.apiservice.acceptRequest(id,this.userid).subscribe((data)=>{
  console.log("request",data);
  
})

  }

  reject(id:any){
    console.log(id);
    this.apiservice.rejectRequest(id,this.userid).subscribe((data)=>{
      console.log("request=",data);
      
    })
  }
}
