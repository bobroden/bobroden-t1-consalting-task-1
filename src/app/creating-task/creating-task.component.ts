import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-creating-task',
  templateUrl: './creating-task.component.html',
  styleUrls: ['./creating-task.component.scss']
})
export class CreatingTaskComponent {

  listOfCategories: string[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<CreatingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService,
    public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.listOfCategories$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfCategories = list;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
    newTaskForm: FormGroup = new FormGroup({
    idFormControl: new FormControl({value: +this.data.id, disabled: true}, Validators.required),
    nameFormControl: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
    startDateFormControl: new FormControl(null),
    endDateFormControl: new FormControl(null),
    priorityFormControl: new FormControl(null),
    categoryFormControl: new FormControl(null)
  }, this.datesValidator('startDateFormControl', 'endDateFormControl'));

  add(): void {
    this.data.id = this.newTaskForm.getRawValue().idFormControl;
    this.data.name = this.newTaskForm.getRawValue().nameFormControl;
    this.data.startDate = this.newTaskForm.getRawValue().startDateFormControl;
    this.data.endDate = this.newTaskForm.getRawValue().endDateFormControl;
    this.data.priority = this.newTaskForm.getRawValue().priorityFormControl;
    this.data.category = this.newTaskForm.getRawValue().categoryFormControl;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  datesValidator(startDate: string, endDate: string): object {
    return (group: FormGroup) => {
      const start = group.controls[startDate];
      const end = group.controls[endDate];
      if(new Date(start.value) > new Date(end.value) && start.value !== null && end.value !== null) {
        return {
          error: true
        };
      }
      return;
    }
  }

}