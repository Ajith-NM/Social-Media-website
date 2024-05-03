import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user_profile_img.subscribe((user_img) => {
      this.profile_img = user_img
    })
    this.userService.user_profile.subscribe((user)=>{
this.username=user.username
    })
   
    this.number= localStorage.getItem("select")
// if (this.number!="") {
  
// }

    console.log(this.number,"selected section");
    
    // this.activate(parseInt(this.number))
  }
  //............
  profile_img: any
  username:any
  number:any
  //..........
  active = "active"
  first = 0
  clicked = true
  notify = "notifyed"
  activated = [true, false, false, false, false, false,false]
  activate(text:number) {
    localStorage.setItem("select",text.toString())
    this.activated[this.first] = false
    this.activated[text] = true
    if (text == 3) {
      this.clicked = false
    }
    this.first = text

  }
}
