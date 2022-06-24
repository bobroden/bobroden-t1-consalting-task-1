import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { UserService } from '../services/user.service';

import { Task } from '../interfaces/task';

@Injectable()
export class TaskInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<Task>, next: HttpHandler): Observable<HttpEvent<Task[]>> {
    if(request.url.includes('/tasks')) {
      switch (request.method) {
        case 'GET':
          return this.getTasks();
        case 'POST':
          //return this.setTask();
        case 'PUT':
          //return this.changeTask();
        case 'DELETE':
          //return this.deleteTask();
      }
    }
    return next.handle(request);
  }

  private getTasks(): Observable<HttpEvent<Task[]>> {
    return of(
      new HttpResponse<Task[]>({status: 200, body: this.userService.getCurrentUser().listOfTasks})
    );
  }
}
