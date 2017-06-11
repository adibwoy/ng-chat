import {Injectable} from '@angular/core';
import {User} from "../model/user";

const USER_LIST: User[] = [
  {
    id: 1,
    name: "Rob"
  },
  {
    id: 2,
    name: "Laura"
  }
];


@Injectable()
export class UserService {

  userList: User[] = [];

  getUserInfo(id: number): User {
    const users: User[] = this.userList.filter(user => user.id === id);
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  constructor() {
    this.populateUserList();
  }

  /**
   *This would ideally be populated from a database but for now we have hardcoded lists
   */
  populateUserList() {
    this.userList = USER_LIST;
  }

}
