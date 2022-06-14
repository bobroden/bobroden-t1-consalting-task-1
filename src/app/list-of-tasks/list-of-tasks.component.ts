import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CreatingTaskComponent } from '../creating-task/creating-task.component';
import { ChangingTaskComponent } from '../changing-task/changing-task.component';
import { DeletingTaskComponent } from '../deleting-task/deleting-task.component';

import { TaskService } from '../services/task.service';

import { Task } from '../interfaces/task';


@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.scss']
})
export class ListOfTasksComponent implements AfterViewInit, OnDestroy {

  displayedColums: string[] = ['id', 'name', 'startDate', 'endDate', 'priority', 'category', 'actions']
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatTable) table: MatTable<Task>;
  @ViewChild(MatSort) sort: MatSort;

  dialogCreateSub: Subscription;
  dialogChangeSub: Subscription;
  dialogDeleteSub: Subscription;
  
  constructor(public taskService: TaskService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if(this.dialogCreateSub)
      this.dialogCreateSub.unsubscribe();
    if(this.dialogChangeSub)
      this.dialogChangeSub.unsubscribe();
    if(this.dialogDeleteSub)
      this.dialogDeleteSub.unsubscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openCreatingDialog(): void {
    const dialogRef = this.dialog.open(CreatingTaskComponent, {
      data: {
        id: this.taskService.listOfTasks.length,
        name: '',
        startDate: null,
        endDate: null,
        priority: null,
        category: []
      }
    });

    this.dialogCreateSub = dialogRef.afterClosed().subscribe(result => {
      try {
        let newTask: Task = {
          id: +result.id,
          name: result.name,
          category: []
        };
        if(new Date(result.startDate) !== null){
          newTask.startDate = result.startDate
        }
        if(new Date(result.endDate) !== null){
          newTask.endDate = result.endDate
        }
        if(result.priority !== null){
          newTask.priority = result.priority
        }
        if(result.category !== null){
          newTask.category = result.category
        }
        this.taskService.add(newTask);
        this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
        this.dataSource.sort = this.sort;
      }
      catch {}
    })
  }

  openChangingDialog(task: Task) {
    const dialogRef = this.dialog.open(ChangingTaskComponent, {
      data: {
        id: +task.id,
        name: task.name,
        startDate: task.startDate,
        endDate: task.endDate,
        priority: task.priority,
        category: task.category
      }
    });

    this.dialogChangeSub = dialogRef.afterClosed().subscribe(result => {
      try {
        let changingTask: Task = {
          id: +result.id,
          name: result.name,
          category: result.category
        };
        if(new Date(result.startDate) !== null){
          changingTask.startDate = result.startDate
        }
        if(new Date(result.endDate) !== null){
          changingTask.endDate = result.endDate
        }
        if(result.priority !== null){
          changingTask.priority = result.priority
        }
        if(result.category !== null){
          changingTask.category = result.category
        }
        this.taskService.changeTask(changingTask);
        this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
        this.dataSource.sort = this.sort;
      }
      catch {}
    })
  }

  openDeletingDialog(task: Task) {
    const dialogRef = this.dialog.open(DeletingTaskComponent, {
      data: {
        id: +task.id,
        name: task.name,
      }
    });

    this.dialogDeleteSub = dialogRef.afterClosed().subscribe(result => {
      try {
        let deletingId = +result.id;
        this.taskService.delete(deletingId);
        this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
        this.dataSource.sort = this.sort;
      }
      catch {}
    })
  }

}
