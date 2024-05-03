import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SystemService } from '../system.service';
import { UserService } from '../user.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private apiservice: ApiService,private service: SystemService,  private userService: UserService,) { }
  ngOnInit(): void {
    
    this.userService.user_id.subscribe((user)=>{
      this.userid=user
    })
    if (this.userid=="") {
      this.userService.updateuserid(localStorage.getItem("id"))
    }
    this.service.notify.subscribe((show) => {
      this.show = show
    })
    this.service.darkmode.subscribe((theme) => {
      this.dark = theme
    })

    this.userService.user_profile.subscribe((user) => {
      this.user_Details = user
    })

    this.userService.user_profile_img.subscribe((user_img) => {
      this.profile_img = user_img
    })
    
   
   // get user call
    this.apiservice.getUser(this.userid).subscribe((data: any) => {
      if (data != "failed") {
        this.userService.updateuser(data)
        console.log("userprofile=",data);
        
        this.userService.updateuserImg(`data:${data.profile_ext};base64,${data.profile_img}`)
      }else{
        console.log("no user");
        
      }
    })
   this.service.popUp.subscribe((popUpMessage)=>{
    this.push_message=popUpMessage
   })
  }
  userid:any
  dark: any
  shownotify = "show-notification"
  push_message:any
  show: any
  
  // user details
  user_Details: any
  profile_img: any
  changetheme() {

     if (this.dark==true) {
      localStorage.setItem("theme","false")
     } else {
      localStorage.setItem("theme","true")
     }
     console.log(localStorage.getItem("theme"));
    this.service.updatetheme(!this.dark)
  }
}