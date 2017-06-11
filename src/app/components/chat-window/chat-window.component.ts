import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService]
})
export class ChatWindowComponent implements OnInit {

  messages: string[] = [];

  /*
   * ID of this chat window's sender. This could be used to get info
   * like user details etc.
   * Ideally this would be at the Chat App level and each Chat Window would
   * request it but for this exercise since our browser has the sender and the receiver
   * at the same level, I am bring it down to the ChatWindow level.
   */
  private _senderId: number;

  get senderId(): number {
    return this._senderId;
  }

  @Input()
  set senderId(value: number) {
    if (typeof value === "number") {
      this._senderId = value;
    }
  }

  private _receiverId: number;

  get receiverId(): number {
    return this._receiverId;
  }

  @Input()
  set receiverId(value: number) {
    if (typeof value === "number") {
      this._receiverId = value;
    }
  }

  messenger: Subject<String>;

  get receiver(): Observable<String> {
    return this.messenger.asObservable();
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
