import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  constructor(private fb: FormBuilder, private apiservice: ApiService, private route: Router, private userService: UserService) { }
  ngOnInit(): void {

  }

  err_msg = ''
  //.....Login signup.......
  active = "active"
  login = true
  showLogin() {
    this.login = !this.login
  }
  //.........................
  show = false
  type = "password"
  showPassword() {
    this.show = !this.show
    if (this.type == "password") {
      this.type = "text"
    }
    else {
      this.type = "password"
    }
  }

  //..................
  signup_img = "assets/images/user.png"
  //signup
  signup = this.fb.group({
    username: [''],
    email: [''],
    password: ['']

  })
  formdata = new FormData()
  upload(event: any) {
    this.formdata.delete("profile")
    const file = event.target.files[0]
    this.formdata.append("profile", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let image1: any = reader.result
      this.signup_img = image1
    }
  }

  onSignup() {
    this.formdata.delete("username")
    this.formdata.delete("email")
    this.formdata.delete("password")
    let username: any
    let email: any
    let password: any

    username = this.signup.value.username
    email = this.signup.value.email
    password = this.signup.value.password

    this.formdata.append("username", username)
    this.formdata.append("email", email)
    this.formdata.append("password", password)

    console.log("Signup", this.signup.value);
    this.apiservice.postSignup(this.formdata).subscribe((data: any) => {
      console.log(data);


      if (data.status == "success") {
        this.userService.updateuserid(data.user._id)
        localStorage.setItem("id", data.user._id)
     
      
      console.log("id=",localStorage.getItem("id"),);
      this.userService.user_id.subscribe((data)=>{
        console.log(data,"=uid");
        
      })
      
      this.route.navigateByUrl('/home')
      }
      else {
        this.err_msg = data.error + "!"
      }

    })
  }

  loginForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],

  })

   onLogin() {
    localStorage.removeItem("id")
    console.log("Login", this.loginForm.value);
    this.apiservice.postLogin(this.loginForm.value).subscribe((data: any) => {
      console.log(data);

      if (data == "invalid email") {
        this.err_msg = data
      }
        else if (data.status == "success") {
          this.userService.updateuserid(data.user._id)
          localStorage.setItem("id", data.user._id)
       
        
        console.log("id=",localStorage.getItem("id"),);
        this.userService.user_id.subscribe((data)=>{
          console.log(data,"=uid");
          
        })
        
        this.route.navigateByUrl('/home')
      }
      else {
        this.err_msg = data.error
      }

    })
  }
}
