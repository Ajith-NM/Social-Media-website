import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SystemService } from './system.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private service:SystemService,) {}
 ngOnInit(): void {
  if ( localStorage.getItem("theme")==null) {
    localStorage.setItem("theme","false")
  }
  else if(localStorage.getItem("theme")=="true"){
    this.service.updatetheme(true)
  }
  else{
    this.service.updatetheme(false)
  }



   this.service.darkmode.subscribe((theme)=>{
     this.darkmode=theme
   })

}

  darkmode:any
  theme="dark-theme"
}
