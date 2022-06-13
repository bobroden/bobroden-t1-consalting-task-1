import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import { User } from '../interfaces/user';
import { MainUserInfo } from '../interfaces/mainUserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listOfUsers: User[] = [];
  isSigned = true;
  currentUser: User;

  constructor(private localStorageService: LocalStorageService) {
    this.listOfUsers = this.localStorageService.get('users');
  }

  addUser(user: MainUserInfo): boolean {
    let newUser: User = {
      id: this.listOfUsers.length,
      login: user.login,
      password: user.password,
      listOfTasks: [],
      listOfCategories: []
    }
    this.currentUser = newUser;
    this.listOfUsers.push(newUser);
    this.localStorageService.set('users', this.listOfUsers);
    this.isSigned = true;
    return true;
  }

  isUser(user: MainUserInfo): boolean {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].login && user.password === this.listOfUsers[i].password) {
        this.currentUser = this.listOfUsers[i];
        return true;
      }
    }
    return false;
  }

  checkSameLogin(user: MainUserInfo) {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].login) {
        return true;
      }
    }
    return false;
  }
}