import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
export class ChangingTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService,
    public categoryService: CategoryService,
    private fb: FormBuilder) {}

  changingTaskForm: FormGroup = this.fb.group({
    idFormControl: [{value: this.data.id, disabled: true}, Validators.required],
    nameFormControl: [this.data.name, Validators.compose([Validators.required, Validators.minLength(3)])],
    startDateFormControl: [this.data.startDate],
    endDateFormControl: [this.data.endDate],
    priorityFormControl: [this.data.priority],
    categoryFormControl: [this.data.category]
  }, {validator: this.datesValidator('startDateFormControl', 'endDateFormControl')})

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
      if(new Date(start.value) > new Date(end.value)) {
        return {
          error: true
        };
      }
      return;
    }
  }

  onCatRemoved(cat: string): void {
    const categories = this.changingTaskForm.controls['categoryFormControl'].value as string[];
    this.removeFirst(categories, cat);
    this.changingTaskForm.controls['categoryFormControl'].setValue(categories);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
