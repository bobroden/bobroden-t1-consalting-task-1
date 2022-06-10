import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from '../services/task.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-deleting-task',
  templateUrl: './deleting-task.component.html',
  styleUrls: ['./deleting-task.component.scss']
})
export class DeletingTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService
    ) {}

  cancel(){
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
