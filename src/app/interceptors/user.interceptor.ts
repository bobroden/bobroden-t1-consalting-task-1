import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  users: User[] = this.localStorageService.get('users');

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    return this.handleRequests(request, next);
  }

  handleRequests(req: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User>> {
    const { url, method } = req;

    if(url.match(/\/users\/.*/) && method === 'GET') {
      const id = this.getId(url);
      return of(new HttpResponse<User>({status: 200}));
    }

    else if(url.endsWith('/users') && method === 'POST') {
      const { body } = req.clone();
      //this.users.push(body);
      return of(new HttpResponse<User>({status: 200, body}));
    }

    else if(url.match(/\/users\/.*/) && method === 'PUT') {
      const id = this.getId(url);
      //const body = {};
      this.users;
      return of(new HttpResponse<User>({status: 200}));
    }
    return next.handle(req);
  }

  getId(url: string): number {
    const urlValues = url.split('/');
    return +urlValues[urlValues.length - 1];
  }

}

export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UserInterceptor,
  multi: true
}