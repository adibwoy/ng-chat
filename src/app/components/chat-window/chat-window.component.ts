import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../../services/message.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs/Subscription";
import {Message} from "../../model/message";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService]
})
export class ChatWindowComponent implements OnDestroy, OnInit, AfterViewInit {

  messages: Message[] = [];

  message: string = "";

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
      this.messageService.register(value, this.messengerObs);
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
  messenger: Subject<Message> = new Subject<Message>();

  /**
   * The receiver will subscribe to this observable
   * @returns {Observable<String>}
   */
  get messengerObs(): Observable<Message> {
    return this.messenger.asObservable();
  }

  private receiverSub: Subscription;

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  /**
   * Connect to the receiver
   */
  ngAfterViewInit() {
    // The receiver would retrieve the message history from the database here
    // every time the connection is view is loaded.

    const receiver: Observable<Message> = this.messageService.subscribe(this.receiverId);
    if (receiver) {
      this.receiverSub = receiver.subscribe((message) => {
        this.messages.push(message);
      });
    }
  }

  /**
   * Populates user info
   * @param id
   */
  populateUserInfo(id: number): void {
    const user: User = this.userService.getUserInfo(id);
    if (user) {
      this.name = user.name;
    } else {
      throw new Error("User not found");
    }
  }

  /**
   * Sends message to the receiver
   */
  sendMessage(): void {
    if (this.message) {
      // Send Message

      const newMessage: Message = new Message(this.message, this.senderId, this.receiverId);

      this.messages.push(newMessage);

      this.messenger.next(
        newMessage
      );

      // Clear Message
      this.message = "";

      // The sender would save the messages array to the database
      // That way both sender and receiver have the same history
      // Each time the connection is re-established the message array is
      // retrieved from the database
    }
  }

  /**
   * Unsubscribes
   */
  ngOnDestroy() {
    this.receiverSub.unsubscribe();
  }

}
