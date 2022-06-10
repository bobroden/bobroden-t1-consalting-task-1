import { Injectable } from '@angular/core';
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

  changeTask(task: Task): Task | null {
    let oldTask = null;
    for(let i = 0; i < this.listOfTasks.length; i++) {
      if(this.listOfTasks[i].id === task.id) {
        oldTask = this.listOfTasks[i];
        this.listOfTasks[i] = task;
      }
    }
    return oldTask;
  }
}
