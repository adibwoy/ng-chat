import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Message} from "../model/message";

@Injectable()
export class MessageService {

  userMap: Map<number, Observable<Message>> = new Map<number, Observable<Message>>();

  constructor() {
  }

  register(userId: number, userReceiver: Observable<Message>): void {
    this.userMap.set(userId, userReceiver);
  }

  subscribe(id: number): Observable<Message> {
    return this.userMap.get(id);
  }

}
