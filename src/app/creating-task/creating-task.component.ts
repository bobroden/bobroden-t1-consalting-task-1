import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-creating-task',
  templateUrl: './creating-task.component.html',
  styleUrls: ['./creating-task.component.scss']
})
export class CreatingTaskComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<CreatingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService,
    public categoryService: CategoryService,
    private fb: FormBuilder) { }

  newTaskForm = this.fb.group({
    idFormControl: [{value: this.taskService.listOfTasks.length, disabled: true}, Validators.required],
    nameFormControl: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    startDateFormControl: [''],
    endDateFormControl: [''],
    priorityFormControl: [''],
    categoryFormControl: ['']
  }, {validator: this.datesValidator('startDateFormControl', 'endDateFormControl')})

  idSub: Subscription;
  nameSub: Subscription;
  startDateSub: Subscription;
  endDateSub: Subscription;
  prioritySub: Subscription;
  categorySub: Subscription;

  cancel(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.idSub = this.newTaskForm.controls['idFormControl'].valueChanges.subscribe(value => this.data.id = value);
    this.nameSub = this.newTaskForm.controls['nameFormControl'].valueChanges.subscribe(value => this.data.name = value);
    this.startDateSub = this.newTaskForm.controls['startDateFormControl'].valueChanges.subscribe(value => this.data.startDate = value);
    this.endDateSub = this.newTaskForm.controls['endDateFormControl'].valueChanges.subscribe(value => this.data.endDate = value);
    this.prioritySub = this.newTaskForm.controls['priorityFormControl'].valueChanges.subscribe(value => this.data.priority = value);
    this.categorySub = this.newTaskForm.controls['categoryFormControl'].valueChanges.subscribe(value => this.data.category = value);
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