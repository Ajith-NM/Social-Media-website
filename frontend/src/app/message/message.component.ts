import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { ApiService } from '../api.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  constructor(private systemService: SystemService,private apiservice:ApiService) {
  }
  ngOnInit(): void {
    this.apiservice.getMessage(localStorage.getItem("id")).subscribe((data:any)=>{
      this.systemService.updatemessaging(data.messages)
      this.friends=data.friends
      this.currentuser=data
    })

    this.systemService.allmessages.subscribe((msg)=>{
      this.allMessages=msg
    })
    this.systemService.receiver.subscribe((data)=>{
      this.currentFriend=data
      console.log("llkkokk",this.currentFriend);
      
    })
    this.systemService.current_messages.subscribe((data)=>{
      this.messagesForDisplay=data
    })
  }
  //.............
friends:any
currentuser: any
allMessages:any[]=[]
currentFriend:any
messagesForDisplay:any[]=[]
messageForSend:string=""



  selectFriend(id: any) {
    let message:any[]=[]
    console.log(id);
    this.systemService.updateuser(this.friends[id])
    // this.currentFriend=this.friends[id]

    this.allMessages.forEach((msg:any )=> {
      if (msg.from==this.currentFriend.email||msg.to==this.currentFriend.email) {
    message.push(msg)
      }
    });

    // this.messagesForDisplay=message
    this.systemService.updatenewmsg(message)
console.log("all",this.messagesForDisplay);

  }

messageSend(){
  if (this.messageForSend!="") {
    let newMsg={
      from:this.currentuser.email,
      to:this.currentFriend.email ,
      message:this.messageForSend
    }
this.apiservice.sendMessage(this.currentuser._id,this.currentFriend._id,newMsg).subscribe((data)=>{
  console.log(data);
  
})
this.messagesForDisplay.push(newMsg)
this.systemService.updatenewmsg(this.messagesForDisplay)
  }

this.messageForSend=""

}


}
