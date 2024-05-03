import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  constructor() { }
//system theme
  private theme = new BehaviorSubject<boolean>(false)
  public darkmode = this.theme.asObservable()
  updatetheme(mode: any) {
    this.theme.next(mode)
  }

  //push-notification box
  private show = new BehaviorSubject<boolean>(false)
  public notify = this.show.asObservable()
  updatenotify(mode: any) {
    this.show.next(mode)
  }
  //push-notification message
  private popUpMessage = new BehaviorSubject<any>('')
  public popUp = this.popUpMessage.asObservable()
  updatepopUpMessage(msg: any) {
    this.popUpMessage.next(msg)
  }
//messaging

private messaged = new BehaviorSubject<any>([])
public allmessages= this.messaged.asObservable()
updatemessaging(msg: any) {
  this.messaged.next(msg)
}
//new messages
private messagesend = new BehaviorSubject<any>([])
public current_messages= this.messagesend.asObservable()
updatenewmsg(msg: any) {
  this.messagesend.next(msg)
}


private user= new BehaviorSubject<any>("none")
public receiver= this.user.asObservable()
updateuser(usr: any) {
  this.user.next(usr)
}
}
