import { Component, ViewChild, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';

import { Task } from '../../interfaces/task';

import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit, OnDestroy {

  displayedColums: string[] = ['name', 'actions']
  dataSource: MatTableDataSource<string>;

  @ViewChild(MatTable) table: MatTable<Task>;

  categoryForm: FormGroup = new FormGroup({
    'addFormControl': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'changeFormControl': new FormControl({value: null, disabled: true}, [Validators.required, Validators.minLength(3)])
  })

  oldChangeValue: string = '';

  isChange: boolean = false;

  listOfTasks: Task[] = [];
  listOfCategories: string[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public categoryService: CategoryService, private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.listOfTasks$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfTasks = list;
    });
    this.categoryService.listOfCategories$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfCategories = list;
      this.dataSource = new MatTableDataSource(this.listOfCategories);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDialog(data: string): void {
    this.dialog.open(ErrorComponent, {
      data: data
    })
  }

  addCategory(): void {
    if(this.categoryForm.controls['addFormControl'].valid && this.categoryForm.controls['addFormControl'].value.trim() !== '') {
      const index = this.listOfCategories.length;
      this.categoryService.add(this.categoryForm.controls['addFormControl'].value.trim(), this.listOfCategories);
      if(index === this.listOfCategories.length) {
        this.openDialog('There is already such a category!');
      }
    }
  }

  deleteCategory(category: string): void {
    this.categoryService.delete(category, this.listOfCategories);

    this.listOfTasks.forEach(item => {
      if(item.category.length !== 0) {
        for(let i = 0; i < item.category.length; i++) {
          if(category === item.category[i])
          item.category.splice(i, 1);
        }
      }
    })
  }

  changeMode(category: string): void {
    this.isChange = true;
    this.categoryForm.controls['changeFormControl'].enable();
    this.oldChangeValue = category;
    this.categoryForm.controls['changeFormControl'].setValue(category);
  }

  changeCategory(): void {
    if( this.categoryForm.controls['changeFormControl'].valid && this.categoryForm.controls['changeFormControl'].value.trim() !== '') {
      if(this.categoryService.changeCategory(this.oldChangeValue, this.categoryForm.controls['changeFormControl'].value.trim(), this.listOfCategories)) {
      
        this.listOfTasks.forEach(item => {
          if(item.category.length !== 0) {
            for(let i = 0; i < item.category.length; i++) {
              if(this.oldChangeValue === item.category[i])
              item.category[i] = this.categoryForm.controls['changeFormControl'].value.trim()
            }
          }
        })

        this.isChange = false;
        this.categoryForm.controls['changeFormControl'].disable();
        this.oldChangeValue = '';
        this.categoryForm.controls['changeFormControl'].setValue('');
      }
      else {
        this.openDialog('There is already such a category!');
      }
    }
  }

}
