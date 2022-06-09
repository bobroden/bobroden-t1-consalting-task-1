import { Component, AfterViewInit, ViewChild, Inject, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from '../services/task.service';

import { CreatingTaskComponent } from '../creating-task/creating-task.component';

import { Task } from '../interfaces/task';


@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.scss']
})
export class ListOfTasksComponent implements AfterViewInit {

  displayedColums: string[] = ['id', 'name', 'startDate', 'endDate', 'priority', 'category', 'actions']
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatTable) table: MatTable<Task>;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public taskService: TaskService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatingTaskComponent, {
      width: '30%',
      data: {
        id: this.taskService.listOfTasks.length,
        name: '',
        startDate: null,
        endDate: null,
        priority: null,
        category: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newTask: Task = {
        id: +result.id,
        name: result.name
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
    })
  }

}
