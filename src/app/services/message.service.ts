import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService {

  userMap: Map<number, Observable<string>> = new Map<number, Observable<string>>();

  constructor() {
  }

  register(userId: number, userReceiver: Observable<string>) {
    this.userMap.set(userId, userReceiver);
  }

}
