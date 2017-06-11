import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService {

  userMap: Map<string, Observable<string>> = new Map<string, Observable<string>>();

  constructor() {
  }

  register(userId: string, userReceiver: Observable<string>) {
    this.userMap.set(userId, userReceiver)
  }

}
