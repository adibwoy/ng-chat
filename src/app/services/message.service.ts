import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Message} from "../model/message";

@Injectable()
export class MessageService {

  userMap: Map<number, Observable<Message>> = new Map<number, Observable<Message>>();

  userTypingMap: Map<number, Observable<boolean>> = new Map<number, Observable<boolean>>();

  constructor() {
  }

  register(userId: number, userReceiver: Observable<Message>): void {
    this.userMap.set(userId, userReceiver);
  }

  registerTypingListener(userId: number, userTyingReceiver: Observable<boolean>): void {
    this.userTypingMap.set(userId, userTyingReceiver)
  }

  subscribe(id: number): Observable<Message> {
    return this.userMap.get(id);
  }

  subscribeTyping(id: number): Observable<boolean> {
    return this.userTypingMap.get(id);
  }

}
