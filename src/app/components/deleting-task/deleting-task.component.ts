import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from '../../services/task.service';

import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-deleting-task',
  templateUrl: './deleting-task.component.html',
  styleUrls: ['./deleting-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletingTaskComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService
    ) {}

  cancel(): void {
    this.dialogRef.close();
  }

}
