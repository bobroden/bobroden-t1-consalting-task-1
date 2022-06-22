import { Injectable } from '@angular/core';

import { CategoryService } from './category.service';
import { TaskService } from './task.service';
import { LocalStorageService } from './local-storage.service';

import { User } from '../interfaces/user';
import { MainUserInfo } from '../interfaces/main-user-info';

import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private listOfUsers: User[] = [];
  private currentUser: User;

  isSigned: boolean = false;

  constructor(private localStorageService: LocalStorageService, private categoryService: CategoryService, private taskService: TaskService) {
    this.listOfUsers = this.localStorageService.get('users');
    if(localStorage.getItem('currentUser')) {
      this.currentUser = this.localStorageService.getCurrentUser();
      this.categoryService.setListOfCategories(this.currentUser.listOfCategories);
      this.taskService.setListOfTasks(this.currentUser.listOfTasks);
      this.isSigned = true;
    }
  }

  setListOfUsers(list: User[]): void {
    this.listOfUsers = list;
  }

  getListOfUsers(): User[] {
    return this.listOfUsers;
  }

  setIsSigned(value: boolean): void {
    this.isSigned = value;
  }

  getIsSigned(): boolean {
    return this.isSigned;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
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
    this.localStorageService.setCurrentUser(this.currentUser);
    this.listOfUsers.push(newUser);
    this.localStorageService.set('users', this.listOfUsers);
    this.isSigned = true;
    return true;
  }

  isUser(user: MainUserInfo): boolean {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(user.login === this.listOfUsers[i].login && user.password === this.listOfUsers[i].password) {
        this.currentUser = this.listOfUsers[i];
        this.localStorageService.setCurrentUser(this.currentUser);
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

  changeUserInfo(user: MainUserInfo) {
    this.currentUser.login = user.login;
    this.currentUser.password = user.password;
  }

  saveChanges(listOfCategories: string[], listOfTasks: Task[]): void {
    for(let i = 0; i < this.listOfUsers.length; i++) {
      if(this.currentUser.id === this.listOfUsers[i].id) {
        this.currentUser.listOfCategories = listOfCategories;
        this.currentUser.listOfTasks = listOfTasks;
        this.listOfUsers.splice(i, 1, this.currentUser);
        this.localStorageService.set('users', this.listOfUsers);
      }
    }
    this.localStorageService.setCurrentUser(this.currentUser);
  }

}