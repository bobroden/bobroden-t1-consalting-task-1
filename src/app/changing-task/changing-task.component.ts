import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-changing-task',
  templateUrl: './changing-task.component.html',
  styleUrls: ['./changing-task.component.scss']
})
export class ChangingTaskComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<ChangingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService,
    public categoryService: CategoryService) {}

  changingTaskForm: FormGroup = new FormGroup({
    idFormControl: new FormControl({value: this.data.id, disabled: true}, Validators.required),
    nameFormControl: new FormControl(this.data.name, Validators.compose([Validators.required, Validators.minLength(3)])),
    startDateFormControl: new FormControl(this.data.startDate),
    endDateFormControl: new FormControl(this.data.endDate),
    priorityFormControl: new FormControl(this.data.priority),
    categoryFormControl: new FormControl(this.data.category)
  }, this.datesValidator('startDateFormControl', 'endDateFormControl'));

  idSub: Subscription;
  nameSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  prioritySub: Subscription;
  categorySub: Subscription;

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.idSub = this.changingTaskForm.controls['idFormControl'].valueChanges.subscribe(value => this.data.id = value);
    this.nameSub = this.changingTaskForm.controls['nameFormControl'].valueChanges.subscribe(value => this.data.name = value);
    this.startDateSub = this.changingTaskForm.controls['startDateFormControl'].valueChanges.subscribe(value => this.data.startDate = value);
    this.endDateSub = this.changingTaskForm.controls['endDateFormControl'].valueChanges.subscribe(value => this.data.endDate = value);
    this.prioritySub = this.changingTaskForm.controls['priorityFormControl'].valueChanges.subscribe(value => this.data.priority = value);
    this.categorySub = this.changingTaskForm.controls['categoryFormControl'].valueChanges.subscribe(value => this.data.category = value);
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.nameSub.unsubscribe();
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
    this.prioritySub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  datesValidator(startDate: string, endDate: string): object {
    return (group: FormGroup) => {
      let start = group.controls[startDate];
      let end = group.controls[endDate];
      if(new Date(start.value) > new Date(end.value) && start.value !== null && end.value !== null) {
        return {
          error: true
        };
      }
      return;
    }
  }

}
