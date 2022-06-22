import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  listOfTasks$ = new BehaviorSubject<Task[]>([]);

  constructor() {}

  setListOfTasks(listOfTasks: Task[]): void {
    this.listOfTasks$.next(listOfTasks);
  }

  add(task: Task, listOfTasks: Task[]): void {
    listOfTasks.push(task);
    this.listOfTasks$.next(listOfTasks);
  }

  delete(id: number, listOfTasks: Task[]): Task | null {
    let oldTask = null;
    for(let i = 0; i < listOfTasks.length; i++) {
      if(listOfTasks[i].id === id) {
        oldTask = listOfTasks[i];
        listOfTasks.splice(i, 1);
        this.listOfTasks$.next(listOfTasks);
      }
    }
    return oldTask;
  }

  changeTask(task: Task, listOfTasks: Task[]): Task | null {
    let oldTask = null;
    for(let i = 0; i < listOfTasks.length; i++) {
      if(listOfTasks[i].id === task.id) {
        oldTask = listOfTasks[i];
        listOfTasks[i] = task;
        this.listOfTasks$.next(listOfTasks);
      }
    }
    return oldTask;
  }
}
