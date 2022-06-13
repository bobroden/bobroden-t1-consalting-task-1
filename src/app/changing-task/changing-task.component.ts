import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder } from '@angular/forms';

import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { Task } from '../interfaces/task';

@Component({
  selector: 'app-changing-task',
  templateUrl: './changing-task.component.html',
  styleUrls: ['./changing-task.component.scss']
})
export class ChangingTaskComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ChangingTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskService: TaskService,
    public categoryService: CategoryService,
    private fb: FormBuilder) {}

  changingTaskForm = this.fb.group({
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

  cancel(){
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

  datesValidator(startDate: string, endDate: string) {
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.data.category?.push(value);
    }
    event.chipInput!.clear();

    this.changingTaskForm.controls['categoryFormControl'].setValue(null);
  }

  remove(category: string): void {
    const index = this.data.category?.indexOf(category);

    if (index && index !== -1) {
      this.data.category?.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.category?.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.changingTaskForm.controls['categoryFormControl'].setValue(null);
  }

  onCatRemoved(cat: string) {
    const categories = this.changingTaskForm.controls['categoryFormControl'].value as string[];
    this.removeFirst(categories, cat);
    this.changingTaskForm.controls['categoryFormControl'].setValue(categories); // To trigger change detection
  }

  private removeFirst(array: any, toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
