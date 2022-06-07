import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import { User } from '../interfaces/user';
import { AboutUser } from '../interfaces/about-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listOfUsers: AboutUser[] = [];
  isSigned = false;

  constructor(private localStorageService: LocalStorageService) {
    this.listOfUsers = this.localStorageService.get('users');
  }

  addUser(user: User): boolean {
    if(this.isUser(user)) {
      return false;
    }
    let newUser: AboutUser = {
      id: this.listOfUsers.length,
      user: user,
      listOfTasks: [],
      listOfCategories: []
    }
    this.listOfUsers.push(newUser);
    this.localStorageService.set('users', this.listOfUsers);
    this.isSigned = true;
    return true;
  }

  isUser(user: User): boolean {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].user.login && user.password === this.listOfUsers[i].user.password)
        return true;
    }
    return false;
  }
}
