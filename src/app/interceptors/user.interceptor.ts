import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from '../error/error.component';

import { User } from '../interfaces/user';
import { MainUserInfo } from '../interfaces/main-user-info';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  listOfUsers: User[] = this.localStorageService.get('users');
  currentUser = this.localStorageService.getCurrentUser();

  constructor(private localStorageService: LocalStorageService, public dialog: MatDialog) {}

  intercept(request: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    request = request.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			}
    });
    return this.handleRequests(request, next).pipe(catchError((requestError) => {
      this.openDialog(requestError.message);
      return throwError(() => new Error(requestError));
    }));
  }

  handleRequests(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    const { url, method } = req;

    if(url.endsWith('/users-login') && method === 'POST') {
      const { body } = req.clone();
      for(let i = 0; i < this.listOfUsers.length; i++) {
        if(this.listOfUsers[i].login === body?.login && this.listOfUsers[i].password === body.password) {
          this.localStorageService.setCurrentUser(this.listOfUsers[i]);
          return of(new HttpResponse<User>({status: 200, body: this.listOfUsers[i]}));
        }
      }
      return throwError(() => new Error('Incorrect login or password :('));
    }

    else if(url.endsWith('/users') && method === 'POST') {
      const { body } = req.clone();
      if(body && !this.checkSameLogin(body)) {
        this.addUser(body);
        return of(new HttpResponse<User>({status: 201, body}));
      }
      return throwError(() => new Error('Sorry, but we already have such a user :('));
    }

    else if(url.endsWith('/users') && method === 'PUT') {
      const { body } = req.clone();
      for(let i = 0; i < this.listOfUsers.length; i++) {
        if(body && body.id === this.listOfUsers[i].id) {
          this.listOfUsers.splice(i, 1, body);
          this.localStorageService.set('users', this.listOfUsers);
          this.localStorageService.setCurrentUser(body);
        }
      }
      return of(new HttpResponse<User>({status: 200, body}));
    }

    else if(url.endsWith('/current-user') && method === 'GET') {
      if(this.currentUser)
        return of(new HttpResponse<User>({status: 200, body: this.currentUser}));
      return of(new HttpResponse<User>({status: 404}));
    }

    return next.handle(req);
  }

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {data: data});
  }

  addUser(user: MainUserInfo): boolean {
    const newUser: User = {
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

}

export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UserInterceptor,
  multi: true
}