import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TaskService } from '../services/task.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-list-of-tasks',
  templateUrl: './list-of-tasks.component.html',
  styleUrls: ['./list-of-tasks.component.scss']
})
export class ListOfTasksComponent implements AfterViewInit {

  displayedColums: string[] = ['id', 'name', 'startDate', 'endDate', 'priority', 'category', 'actions']
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private taskService: TaskService) {
    this.dataSource = new MatTableDataSource(this.taskService.listOfTasks);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
