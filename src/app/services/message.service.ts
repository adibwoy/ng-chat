import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class MessageService {

  userMap: Map<number, Observable<string>> = new Map<number, Observable<string>>();

  constructor() {
  }

  register(userId: number, userReceiver: Observable<string>): void {
    this.userMap.set(userId, userReceiver);
  }

  subscribe(id: number): Observable<string> {
    return this.userMap.get(id);
  }

}
