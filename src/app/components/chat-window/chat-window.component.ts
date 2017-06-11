import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService]
})
export class ChatWindowComponent implements OnInit {

  messages: string[] = [];

  /*
   * ID of this chat window's owner. This could be used to get info
   * like user details etc.
   * Ideally this would be at the Chat App level and each Chat Window would
   * request it but for this exercise since our browser has the sender and the receiver
   * at the same level, I am bring it down to the ChatWindow level.
   */
  private _ownerId: number;

  get ownerId(): number {
    return this._ownerId;
  }

  @Input()
  set ownerId(value: number) {
    this._ownerId = value;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
