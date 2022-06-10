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

  delete(id: number): Task | null {
    let oldTask = null;
    for(let i = 0; i < this.listOfTasks.length; i++) {
      if(this.listOfTasks[i].id === id) {
        oldTask = this.listOfTasks[i];
        this.listOfTasks.splice(i, 1);
      }
    }
    return oldTask;
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
