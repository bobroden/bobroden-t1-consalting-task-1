import { Injectable } from '@angular/core';

import { CategoryService } from './category.service';
import { TaskService } from './task.service';
import { LocalStorageService } from './local-storage.service';

import { User } from '../interfaces/user';
import { MainUserInfo } from '../interfaces/mainUserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  listOfUsers: User[] = [];
  isSigned: boolean = false;
  currentUser: User;

  constructor(private localStorageService: LocalStorageService, private categoryService: CategoryService, private taskService: TaskService) {
    this.listOfUsers = this.localStorageService.get('users');
    if(localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
      this.categoryService.listOfCategories = this.currentUser.listOfCategories;
      this.taskService.listOfTasks = this.currentUser.listOfTasks;
      this.isSigned = true;
    }
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
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.listOfUsers.push(newUser);
    this.localStorageService.set('users', this.listOfUsers);
    this.isSigned = true;
    return true;
  }

  isUser(user: MainUserInfo): boolean {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].login && user.password === this.listOfUsers[i].password) {
        this.currentUser = this.listOfUsers[i];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return true;
      }
    }
    return false;
  }

  checkSameLogin(user: MainUserInfo): boolean {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].login) {
        return true;
      }
    }
    return false;
  }

  saveChanges(): void {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(this.currentUser.id === this.listOfUsers[i].id) {
        this.currentUser.listOfCategories = this.categoryService.listOfCategories;
        this.currentUser.listOfTasks = this.taskService.listOfTasks;
        this.listOfUsers.splice(i, 1, this.currentUser);
        this.localStorageService.set('users', this.listOfUsers);
      }
    }
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

}