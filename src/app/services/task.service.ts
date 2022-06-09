import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  listOfTasks: Task[] = [];

  constructor() {}

  add(task: Task): Task {
    this.listOfTasks.push(task);
    return task;
  }

  delete(task: Task): Task | 'error' {
    const index = this.listOfTasks.indexOf(task);
    if(index > -1) {
      this.listOfTasks.splice(index, 1);
      return task;
    }
    return 'error';
  }

  getTasks(): Observable<Task[]> {
    return of(this.listOfTasks);
  }
}
