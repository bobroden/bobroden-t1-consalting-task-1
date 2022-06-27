import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user';
import { MainUserInfo } from '../interfaces/main-user-info';
import { Task } from '../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User;
  
  isSigned$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  setIsSigned(value: boolean): void {
    this.isSigned$.next(value);
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getServerCurrentUser() {
    return this.http.get<User>('/current-user');
  }

  getServerUser(user: MainUserInfo): Observable<User> {
    return this.http.post<User>('/users-login', user);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  changeUserInfo(user: MainUserInfo) {
    this.currentUser.login = user.login;
    this.currentUser.password = user.password;
  }

  saveChanges(listOfCategories: string[], listOfTasks: Task[]) {
    this.currentUser.listOfCategories = listOfCategories;
    this.currentUser.listOfTasks = listOfTasks;
    return this.http.put<User>('/users', this.currentUser);
  }

  addUser(user: MainUserInfo): Observable<User> {
    const newUser: User = {
      login: user.login,
      password: user.password,
      listOfTasks: [],
      listOfCategories: []
    }
    return this.http.post<User>('/users', newUser);
  }

}