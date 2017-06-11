import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../../services/message.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService]
})
export class ChatWindowComponent implements OnInit {

  messages: string[] = [];

  /**
   * ID of this chat window's sender. This could be used to get info
   * like user details etc.
   * Ideally this would be at the Chat App level and each Chat Window would
   * request it but for this exercise since our browser has the sender and the receiver
   * at the same level, I am bring it down to the ChatWindow level.
   */
  private _senderId: number;

  public name: String;

  get senderId(): number {
    return this._senderId;
  }

  @Input()
  set senderId(value: number) {
    if (typeof value === "number") {
      this._senderId = value;

      /**
       * Get user details
       */
      this.populateUserInfo(value);

      /**
       * Registration should be in the constructor or in ngOnInit
       * but I am doing it here because this is where the Sender ID is actually
       * initialized
       */
      this.messageService.register(value, this.receiver);
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

  /**
   * Will be used to send the message
   * @type {Subject<string>}
   */
  messenger: Subject<String> = new Subject<string>();

  /**
   * The receiver will subscribe to this observable
   * @returns {Observable<String>}
   */
  get receiver(): Observable<String> {
    return this.messenger.asObservable();
  }

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  populateUserInfo(id: number): void {
    const user: User = this.userService.getUserInfo(id);
    if (user) {
      this.name = user.name;
    } else {
      throw new Error("User not found");
    }
  }

}
